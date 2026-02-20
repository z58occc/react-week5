import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Audio } from "react-loader-spinner";

export default function Products() {
  const [products, setProducts] = useState([]);

  const api = import.meta.env.VITE_APP_API_BASE;
  const path = import.meta.env.VITE_APP_API_PATH;

  useEffect(() => {
    async function getProducts() {
      const res = await axios.get(`${api}/v2/api/${path}/products/all`);
      setProducts(res.data.products);
    }
    getProducts();
  }, []);

  return (
    <>
      <div className="row">
        {products.map((product, i) => {
          return (
            <div className="card col-4" key={i}>
              <img
                src={product.imageUrl}
                className="card-img-top
              object-fit-cover"
                alt="商品圖片"
                style={{
                  height: "300px",
                }}
              />
              <div className="card-body">
                <Link to={product.id} className="card-title">
                  {product.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
