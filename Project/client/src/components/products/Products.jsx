import { useEffect, useState } from "react";
import { publicRequest } from "../../requestAxios";
import Product from "../product/Product";
import "./products.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Products = ({ title, type, limit, isPaging }) => {
  let [numPage, setNumPage] = useState(1);
  let [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      try {
        let path;
        if (type === "most") {
          path = `api/product/recommend?limit=${limit}&page=${currentPage - 1}`;
        } else if (type == 'random'){
          path = `api/product/random?limit=${limit}&page=0`;
        } else {
          path = `api/product/get_list_products?sort=${type}&limit=${limit}&page=${
            currentPage - 1
          }`;
        }
        const res = await publicRequest.get(path);
        setProducts(res.data.productData);
        setNumPage(res.data.numPage);
      } catch (err) {
        setProducts(err.response.data.data.productData);
        setNumPage(err.response.data.data.numPage);
      }
    };
    getProducts();
  }, [type, currentPage]);
  useEffect(()=>{
    setCurrentPage(1)
  },[type])
  return (
    <div className="products">
      <div className="title">
        <b></b>
        <h2>{title}</h2>
        <b></b>
      </div>
      <div className="wrapper">
        {products && Object.keys(products).length > 0 ? (
          products.map((product) => <Product product={product}></Product>)
        ) : (
          <></>
        )}
      </div>
      {isPaging ? (
        <Stack className="stack" spacing={2}>
          <Pagination
            count={numPage}
            page={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.textContent))}
          />
        </Stack>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Products;
