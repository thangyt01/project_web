import { useEffect, useState } from 'react';
import { publicRequest } from '../../requestAxios';
import Product from '../product/Product'
import './products.scss'

const Products = ({title, type}) => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    const getProducts = async () => {
      try {
        let path
        if(type === 'new') path = `api/product/get_list_products`
        if(type === 'most') path = `api/product/recommend`
        const res = await publicRequest.get(path);
        setProducts(res.data);
      } catch (err) {
        setProducts(err.response.data.data);
      }
    };
    getProducts();
  }, []);
  return (
    <div className='products'>
        <div className="title">
            <b></b>
            <h2>{title}</h2>
            <b></b>
        </div>
        <div className="wrapper">
          {products && Object.keys(products).length > 0 ? 
            products.map(product => <Product product={product}></Product>)
            : <></>
          }
        </div>
    </div>
  )
}

export default Products