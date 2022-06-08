import "./product.scss"

const Product = () => {
  return (
    <div className='product'>
      <div className="top">
        <div className="top2">
          <div className="icon">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-magnifying-glass"></i>
            <i class="fa-solid fa-cart-plus"></i>
          </div>
          <div className="top1" style={{ background: "url('http://macshop.giaodienwebmau.com.vn/wp-content/uploads/2020/12/028.jpg') no-repeat center center / contain" }}></div>
        </div>
      </div>
      <div className="discount">20%</div>
      <div className="topSell"><i className="fa-solid fa-crown"></i><p>TOP</p></div>
      <div className="new">New</div>
      <div className="bottom">
        <p className="name"><p>Apple Watch Leather Loop – Dây Apple Watch da sang trọng và lịch lãm</p></p>
        <b className="price">400.000₫ - 600.000₫</b>
      </div>
    </div>
  )
}

export default Product