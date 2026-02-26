import axios from "axios";
import { useEffect, useState } from "react";
import "../stylesheet/cart.scss";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { showToast } from "../slice/messageSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(null);
  const api = import.meta.env.VITE_APP_API_BASE;
  const path = import.meta.env.VITE_APP_API_PATH;
  const navigate = useNavigate();
  async function getCart() {
    const res = await axios.get(`${api}/v2/api/${path}/cart`);
    setCartItems(res.data.data);
  }
  useEffect(() => {
    getCart();
  }, []);
  async function handleDeleteItem(id) {
    const res = await axios.delete(`${api}/v2/api/${path}/cart/${id}`);
    dispatch(
      showToast({
        message: "已成功從購物車中刪除",
        bg: "danger",
      }),
    );
    getCart();
  }
  function handleOrder() {
    navigate("/order");
  }
  return (
    <>
      {!cartItems ? (
        <Spinner />
      ) : (
        <div className="container">
          {cartItems?.carts?.length === 0 ? (
            <h1>目前購物車是空的</h1>
          ) : (
            <>
              <h1>購物車</h1>

              <div className="cart">
                {/* <!-- 商品列表 --> */}
                <div className="cart-items">
                  {/* <!-- 商品 1 --> */}
                  {cartItems?.carts?.map((item, i) => {
                    return (
                      <div key={i} className="cart-item">
                        <img
                          src={item.product.imageUrl}
                          alt="防潑水輕量後背包"
                        />

                        <div className="item-info">
                          <div className="item-title">{item.product.title}</div>
                          <div className="item-desc">
                            {item.product.content}
                          </div>
                          <span>${item.product.price}</span>

                          <div className="item-meta">
                            <div className="qty">
                              <button>-</button>
                              <span>{item.qty}</span>
                              <button>+</button>
                            </div>

                            <div className="price">NT${item.total}</div>
                          </div>

                          <div
                            className="remove"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            移除
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* <!-- 結帳區 --> */}
                <div className="summary">
                  <h2>訂單摘要</h2>

                  <div className="summary-row">
                    <span>商品小計</span>
                    <span>NT${cartItems.total}</span>
                  </div>

                  <div className="summary-row">
                    <span>運費</span>
                    <span>NT$0</span>
                  </div>

                  <div className="summary-row total">
                    <span>總計</span>
                    <span>NT${cartItems.total}</span>
                  </div>

                  <button className="checkout" onClick={handleOrder}>
                    前往結帳
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
