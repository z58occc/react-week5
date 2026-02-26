import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../stylesheet/productDetail.scss";
import { useDispatch } from "react-redux";
import { showToast } from "../slice/messageSlice";
import { useNavigate } from "react-router";

export default function ProductDetails() {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_APP_API_BASE;
  const path = import.meta.env.VITE_APP_API_PATH;
  const param = useParams();
  const { id } = param;
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const item = {
    product_id: id,
    qty: 1,
  };

  async function addCart() {
    const res = await axios.post(`${api}/v2/api/${path}/cart`, {
      data: item,
    });
    dispatch(
      showToast({
        message: "已成功加入購物車",
        bg: "success",
      }),
    );
  }

  useEffect(() => {
    async function getProduct(id) {
      const res = await axios.get(`${api}/v2/api/${path}/product/${id}`);
      setProduct(res.data.product);
    }

    getProduct(id);
  }, []);

  return (
    <>
      <div className="container">
        <div className="product">
          {/* <!-- 左側圖片 --> */}
          <div className="product-images">
            <img
              className="main-image"
              src={product.imageUrl}
              alt="滑鼠（靜音款）"
            />

            <div className="thumbs">
              {product?.imagesUrl?.map((url, i) => {
                return (
                  <img
                    key={i}
                    src={url}
                    style={{
                      height: "100px",
                      width: "100px",
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* <!-- 右側資訊 --> */}
          <div className="product-info">
            <div className="category">分類：{product.category}</div>

            <h1 className="title">{product.title}</h1>

            <div className="price">
              <span className="sale">NT${product.price}</span>
            </div>

            <div className="description">{product.description}</div>

            <div className="content">
              內容物：
              {product.content}
            </div>

            <div className="actions">
              <button onClick={addCart} className="add-cart">
                加入購物車
              </button>
              <button
                className="buy-now"
                onClick={() => {
                  addCart();
                  navigate("/order");
                }}
              >
                立即購買
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
