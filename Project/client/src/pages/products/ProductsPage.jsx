import "./productsPage.scss";
import { Header } from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Products from "../../components/products/Products";
import { useState } from "react";


const ProductsPage = () => {
  let [type, setType] = useState(1)
  const handleChange = (e) =>{
    setType(e.target.value)
  }
  return (
    <div className="productsPage">
      <Header selected={2} />
      <div className="productsPage__content padding___main">
        <h2 className="">Danh sách các sản phẩm</h2>
        <select onChange={handleChange} name="sort" id="sort">
          <option value="1">Mới nhất</option>
          <option value="most">Bán chạy</option>
          <option value="3">Giá tăng dần</option>
          <option value="4">Giá giảm dần</option>
        </select>
      </div>
      <Products title={""} type={type} limit={16} isPaging={true} />
      <Footer />
    </div>
  );
};

export default ProductsPage;
