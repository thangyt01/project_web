import Product from '../product/Product'
import './products.scss'

const Products = ({title}) => {
  return (
    <div className='products padding___main'>
        <div className="title">
            <b></b>
            <h2>{title}</h2>
            <b></b>
        </div>
        <div className="wrapper">
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
        </div>
    </div>
  )
}

export default Products