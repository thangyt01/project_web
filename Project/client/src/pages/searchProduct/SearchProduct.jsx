import { Header } from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { publicRequest } from "../../requestAxios";
import Product from "../../components/product/Product";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation()
  let keyword = location.search.split('=')[1]
  const handleChange = (e) => {
    switch(e.target.value){
      // case '1':
      //   setProducts(products.sort((a, b) => {
      //     if(a.createdAt >= b.createdAt) return 1
      //     return -1
      //   }))
      //   break
      // case 'most': 
      //   setProducts(products.sort((a, b) => {
      //     if(a.price >= b.price) return -1
      //     return -1
      //   }))
      //   break
    }
  }
  useEffect(() => {
    const getProducts = async () => {
      try {
        let path = `api/product/get_list_products?limit=${16}&page=${currentPage - 1}&name=${keyword}`;
        const res = await publicRequest.get(path);
        setProducts(res.data.productData);
      } catch (err) {
        setProducts(err.response.data.data.productData);
      }
    };
    getProducts();
  }, [keyword])
  console.log(products)
  return (
    <div className="productsPage">
      <Header selected={2} />
      <div className="productsPage__content padding___main">
        <h2 className="">{`Tìm kiếm theo '${decodeURIComponent(keyword)}'`}</h2>
        <select onChange={handleChange} name="sort" id="sort">
          <option value="1">Mới nhất</option>
          <option value="most">Bán chạy</option>
          <option value="3">Giá tăng dần</option>
          <option value="4">Giá giảm dần</option>
        </select>
      </div>
      <div className="products">
        <div className="title">
          <b></b>
          <h2></h2>
          <b></b>
        </div>
        <div className="wrapper">
          {products.map(product => 
            <Product product={product}></Product>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchProduct;
