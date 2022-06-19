import { Link } from "react-router-dom"
import "./product.scss"

const Product = ({product}) => {
  return (
    <div className='product'>
      <div className="top">
        <div className="top2">
          <div className="icon">
            <i class="fa-solid fa-heart"></i>
            <Link style={{textDecoration: 'none', color: "#ccc"}} to={"/product/"+product.id}>
              <i class="fa-solid fa-magnifying-glass"></i>
            </Link>
            <i class="fa-solid fa-cart-plus"></i>
          </div>
          <div className="top1" style={{ background: `url('${product.path[0]}') no-repeat center center / contain` }}></div>
        </div>
      </div>
      {
      product.discount ? 
        <div className="discount">-{product.discount + "%"}</div>
        :
        <></>
      }
      <div className="topSell"><i className="fa-solid fa-crown"></i><p>TOP</p></div>
      <div className="new">New</div>
      <div className="bottom">
        <p className="name"><p>{product.name}</p></p>
        <b className="price">{product.price} đ</b>
      </div>
    </div>
  )
}

export default Product