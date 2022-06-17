import './productsPage.scss'
import { Header } from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Products from '../../components/products/Products'

const ProductsPage = () => {
  return (
    <div className='productsPage'>
        <Header selected={2}/>
        <div className="productsPage__content">
          <h2 className='padding___main'>Danh sách các sản phẩm</h2>
        </div>
        <Products title={""} type={'new'}/>
        <Footer/>
    </div>
  )
}

export default ProductsPage