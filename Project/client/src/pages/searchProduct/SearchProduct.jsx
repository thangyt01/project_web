import { Header } from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestAxios";
import Product from "../../components/product/Product";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import Notfound from "../../components/notfound/Notfound";
import Products from "../../components/products/Products";

const SearchProduct = () => {
  let [numPage, setNumPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [change, setChange] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  let keyword = location.search.split("=")[1];
  const handleChange = (e) => {
    switch (e.target.value) {
      case "1":
        setProducts(
          products.sort((a, b) => {
            if (a.createdAt >= b.createdAt) return -1;
            return 1;
          })
        );
        setChange(1);
        break;
      case "3":
        setProducts(
          products.sort((a, b) => {
            if (
              parseInt(a.price.split(" - ")[0]) >=
              parseInt(b.price.split(" - ")[0])
            )
              return 1;
            return -1;
          })
        );
        setChange(2);
        break;
      case "4":
        setProducts(
          products.sort((a, b) => {
            if (
              parseInt(a.price.split(" - ")[0]) <
              parseInt(b.price.split(" - ")[0])
            )
              return 1;
            return -1;
          })
        );
        setChange(3);
        break;
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [keyword]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let path = `api/product/get_list_products?limit=${16}&page=${
          currentPage - 1
        }&name=${keyword}`;
        const res = await publicRequest.get(path);
        setProducts(res.data.productData);
        setNumPage(res.data.numPage);
      } catch (err) {
        setNumPage(err.response.data.data.numPage);
        setProducts(err.response.data.data.productData);
      }
    };
    getProducts();
  }, [keyword, currentPage]);
  return (
    <div className="productsPage">
      <Header selected={2} />
      <div className="productsPage__content padding___main">
        <h2 className="">{`Tìm kiếm theo '${decodeURIComponent(keyword)}'`}</h2>
        <select onChange={handleChange} name="sort" id="sort">
          <option value="1">Mới nhất</option>
          <option value="3">Giá tăng dần</option>
          <option value="4">Giá giảm dần</option>
        </select>
      </div>
      {products.length > 0 ? (
        <div className="products">
          <div className="title">
            <b></b>
            <h2></h2>
            <b></b>
          </div>
          <div className="wrapper">
            {products.map((product) => (
              <Product product={product}></Product>
            ))}
          </div>
          <Stack className="stack" spacing={2}>
            <Pagination
              count={numPage}
              page={currentPage}
              onChange={(e) => setCurrentPage(parseInt(e.target.textContent))}
            />
          </Stack>
        </div>
      ) : (
        <div>
          <Notfound title={"Không tìm thấy sản phẩm"}/>
        </div>
      )}
      <Products title={'Sản phẩm của chúng tôi'} type={'new'} limit={4}></Products>
      <Footer />
    </div>
  );
};

export default SearchProduct;
