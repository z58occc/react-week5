import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function ProductModal({
  tempProduct,
  state,
  closeModal,
  renderProducts,
}) {
  const api = import.meta.env.VITE_APP_API_BASE;
  const path = import.meta.env.VITE_APP_API_PATH;
  const imgRef = useRef(null);
  const imgsRef = useRef([]);
  const [uploadImg, setUploadImg] = useState(null);
  const [newProduct, setNewProduct] = useState({
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
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  async function upload(file) {
    if (!file) return;
    const formData = new FormData();
    formData.append("file-to-upload", file);
    const uploadRes = await axios.post(
      `${api}/v2/api/${path}/admin/upload`,
      formData,
    );
    setUploadImg(uploadRes.data.imageUrl);
  }

  async function handleSubmit(e) {
    //提交表單
    e.preventDefault();
    try {
      if (state === "update") {
        const { id } = tempProduct;
        const res = await axios.put(
          `${api}/v2/api/${path}/admin/product/${id}`,
          { data: newProduct },
        );
      } else {
        const res = await axios.post(`${api}/v2/api/${path}/admin/product`, {
          data: newProduct,
        });
      }

      closeModal();
      renderProducts();
    } catch (error) {
      alert(JSON.stringify(error.response.data.message));
    }
  }

  function handleChange(e) {
    //寫入資料
    const { dataset, name, value, checked } = e.target;

    let newValue = value;

    if (name === "imagesUrl") {
      imgsRef.current[dataset.index].src = value;
      const newData = newProduct.imagesUrl.map((item, i) => {
        if (i === Number(dataset.index)) {
          item = value;
        }
        return item;
      });
      newValue = newData;
    }
    if (name === "imageUrl") imgRef.current.src = value;

    if (name === "is_enabled") {
      newValue = checked ? 1 : 0;
    } else if (name === "origin_price" || name === "price") {
      newValue = Number(value);
    }
    setNewProduct({
      ...newProduct,
      [name]: newValue,
    });
  }
  useEffect(() => {
    setNewProduct(tempProduct);
  }, [tempProduct]);

  return (
    <div id="productModal" className="modal  fade" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {state ? "編輯" : "新增"}
              商品
            </h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="title" className=" form-label">
                      產品名稱
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="請輸入產品名稱"
                      name="title"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.title}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className=" form-label">
                      類別
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="category"
                      placeholder="請輸入產品類別"
                      name="category"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.category}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="origin_price" className=" form-label">
                      原價
                    </label>
                    <input
                      min="0"
                      type="number"
                      className="form-control"
                      id="origin_price"
                      placeholder="請輸入產品原價"
                      name="origin_price"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.origin_price}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className=" form-label">
                      售價
                    </label>
                    <input
                      min="0"
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="請輸入產品售價"
                      name="price"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.price}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="unit" className=" form-label">
                      單位
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="unit"
                      placeholder="請輸入產品單位"
                      name="unit"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.unit}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className=" form-label">
                      描述
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      placeholder="請輸入產品描述"
                      name="description"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.description}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className=" form-label">
                      內容
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="content"
                      placeholder="請輸入產品內容"
                      name="content"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.content}
                    />
                  </div>
                  <div className="mb-3 form-check ps-0">
                    <label className="form-check-label" htmlFor="is_enabled">
                      商品評價
                    </label>
                    <select name="rating" onChange={(e) => handleChange(e)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      name="is_enabled"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      checked={newProduct.is_enabled}
                    />
                    <label className="form-check-label" htmlFor="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="file-to-upload">上傳圖片</label>
                    <input
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        upload(e.target.files[0]);
                      }}
                      type="file"
                      name="file-to-upload"
                      id="file-to-upload"
                    />
                    <img
                      src={uploadImg || null}
                      alt="上傳的圖片"
                      className={uploadImg ? "" : "d-none"}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imageUrl" className=" form-label">
                      主圖網址
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="imageUrl"
                      placeholder="請輸入主圖網址"
                      name="imageUrl"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      value={newProduct.imageUrl}
                    />
                    <img
                      ref={imgRef}
                      alt="主圖"
                      src={newProduct?.imageUrl || null}
                      className={newProduct?.imageUrl ? "" : "d-none"}
                    />
                  </div>
                  <div className="mb-3 d-flex flex-column ">
                    <label htmlFor="imagesUrl" className=" form-label">
                      其餘商品圖片
                    </label>
                    {[...Array(5).keys()].map((n) => {
                      return (
                        <div key={n}>
                          <input
                            data-index={n}
                            type="text"
                            className="mt-3 form-control"
                            placeholder={`商品圖片${n + 1}網址`}
                            name="imagesUrl"
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            value={newProduct.imagesUrl[n]}
                          />
                          <img
                            ref={(el) => (imgsRef.current[n] = el)}
                            alt="副圖"
                            src={newProduct?.imagesUrl[n] || null}
                            className={newProduct?.imagesUrl[n] ? "" : "d-none"}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                關閉
              </button>
              <button type="sumit" className="btn btn-primary">
                確定
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
