import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";
import "../stylesheet/productList.scss";


export default function ProductList() {
  const [pagination, setPagination] = useState({});
  const [isBlur, setIsBlur] = useState(true);
  const myModal = useRef(null);
  const [tempProduct, setTempProduct] = useState({
    title: "",
    category: "",
    origin_price: 0,
    price: 0,
    unit: "",
    description: "",
    content: "",
    is_enabled: 1,
    imageUrl: "",
    imagesUrl: ["", "", "", "", ""],
  });
  const [products, setProducts] = useState([]);
  const [modalState, setModalState] = useState("");
  const api = import.meta.env.VITE_APP_API_BASE;
  const path = import.meta.env.VITE_APP_API_PATH;
  const navigate = useNavigate();

  async function getProducts(page = 2) {
    const res = await axios.get(
      `${api}/v2/api/${path}/admin/products?page=${page}`
    );
    console.log(res.data);
    setProducts(res.data.products);
    setPagination(res.data.pagination);
  }

  async function renderProducts() {
    const res = await getProducts();
    setProducts(res);
  }
  async function userCheck(token) {
    try {
      const res = await axios.post(
        `${api}/v2/api/user/check`,
        {},
        { headers: { Authorization: token } },
      );
      setIsBlur(!isBlur);
    } catch (err) {
      alert(err.response.data.message);
      navigate("/");
    }
  }

  function handleDelete(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await axios.delete(
            `${api}/v2/api/${path}/admin/product/${id}`,
          );
          getProducts();
          renderProducts();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  function openModal(state, tempProduct) {
    setModalState(state);
    setTempProduct(tempProduct);
    myModal.current.show();
  }
  function closeModal() {
    myModal.current.hide();
  }

  useEffect(() => {
    myModal.current = new Modal("#productModal", {
      backdrop: "static",
    });
  }, []);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("hexToken="))
      ?.split("=")[1];
    axios.defaults.headers.common.Authorization = token;

    async function handleCheck(token) {
      const res = await userCheck(token);
    }
    handleCheck(token);
  }, []);
  useEffect(() => {
    getProducts("1");
  }, []);

  return (
    <div className="container">
      <div className="row mt-5">
        <div
          className="col-6"
          style={{
            filter: isBlur ? "blur(1.5rem)" : "",
          }}
        >
          <h2>產品列表</h2>
          <table className="table">
            <thead>
              <tr>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>是否啟用</th>
                <th>查看細節</th>
                <th>刪除編輯</th>
              </tr>
            </thead>
            <tbody>
              {products && products.length > 0 ? (
                products.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.origin_price}</td>
                    <td>{item.price}</td>
                    <td>{item.is_enabled ? "啟用" : "未啟用"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => setTempProduct(item)}
                      >
                        查看細節
                      </button>
                    </td>
                    <td>
                      <button
                        className="me-1 btn btn-warning"
                        onClick={() => openModal("update", item)}
                      >
                        編輯
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">尚無產品資料</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="d-flex justify-content-end">
            <Pagination pagination={pagination} changePage={getProducts} />
            <button
              type="button"
              className="btn btn-info"
              onClick={() =>
                openModal("", {
                  title: "",
                  category: "",
                  origin_price: 0,
                  price: 0,
                  unit: "",
                  description: "",
                  content: "",
                  is_enabled: 1,
                  imageUrl: "",
                  imagesUrl: ["", "", "", "", ""],
                  test: "test",
                })
              }
            >
              建立新的產品
            </button>
          </div>
          <ProductModal
            closeModal={closeModal}
            state={modalState}
            tempProduct={tempProduct}
            renderProducts={renderProducts}
          />
        </div>
        {tempProduct.title ? (
          <div className="col-6">
            <h2>單一產品細節</h2>
            <div className="card mb-3">
              <img
                src={tempProduct?.imageUrl || null}
                className="card-img-top primary-image"
                alt="主圖"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {tempProduct.title}
                  <span className="badge bg-primary ms-2">
                    {tempProduct.category}
                  </span>
                </h5>
                <p>商品評價：{Number(tempProduct.rating)}</p>
                <p className="card-text">商品描述：{tempProduct.description}</p>
                <p className="card-text">商品內容：{tempProduct.content}</p>
                <div className="d-flex">
                  <p className="card-text text-secondary">
                    <del>{tempProduct.origin_price}</del>
                  </p>
                  元 / {tempProduct.price} 元
                </div>
                <h5 className="mt-3">更多圖片：</h5>
                <div className="d-flex flex-wrap">
                  {tempProduct.imagesUrl?.map((url, index) => (
                    <img
                      key={index}
                      src={url || null}
                      className="images"
                      alt="副圖"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
