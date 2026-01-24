import Nav from "./components/Nav";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
