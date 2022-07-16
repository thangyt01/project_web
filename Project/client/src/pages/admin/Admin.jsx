import { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { privateRequest } from '../../requestAxios'
import './admin.scss'
import User from './components/User'
import { useSelector } from 'react-redux'
import Product from './components/Product'
import Overview from './components/Overview'
import Order from './components/Order'

const Admin = ({choose}) => {
  const { currentUser } = useSelector(state => state.user)
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [order, setOrder] = useState([])
  const [page, setPage] = useState(1)
  const [dialog, setDialog] = useState(false)
    const [popup, setPopup] = useState(false)
  useEffect(()=>{
    const getUsers = async () => {
      try {
        const res = await privateRequest.get('/api/user/get_list_users?sortTime=1', {
          headers: {
            authorization: JSON.stringify(currentUser.token)
          }
        })
        setUsers(res.data)
      } catch (error) {
        const res = error.response.data
        if(res.code === 200){
          setUsers(res.data)
        }
      }
    }
    getUsers()
  }, [choose])
  useEffect(()=>{
    const getProducts = async () => {
      try {
        const res = await privateRequest.get('api/product/get_list_products?limit=999', {
          headers: {
            authorization: JSON.stringify(currentUser.token)
          }
        })
        setProducts(res.data.productData)
      } catch (error) {
        const res = error.response.data
        if(res.code === 200){
          setProducts(res.data.productData)
        }
      }
    }
    getProducts()
  }, [choose])
  useEffect(()=>{
    const getOrders = async () => {
      try {
        const res = await privateRequest.get('api/order/get_list_total_order?limit=999', {
          headers: {
            authorization: JSON.stringify(currentUser.token)
          }
        })
        setOrder(res.data.productData)
      } catch (error) {
        const res = error.response.data
        if(res.code === 200){
          setOrder(res.data)
        }
      }
    }
    getOrders()
  }, [choose])
  
  return (
    <div className='admin'>
      <Header></Header>
      <div className="content padding___main">
        <p className="admin-header">Quản lý người dùng</p>
        <div className='over'>
          <div className="selected1">
            <p onClick={()=>setPage(1)} className={page === 1 && 'choose'}>Tổng quan</p>
            <p onClick={()=>setPage(2)} className={page === 2 && 'choose'}>Người dùng</p>
            <p onClick={()=>setPage(3)} className={page === 3 && 'choose'}>Sản phẩm</p>
            <p onClick={()=>setPage(4)} className={page === 4 && 'choose'}>Đơn hàng</p>
          </div>
        </div>
        {page === 1 && <Overview/>}
        {users && users.length > 0 && page === 2 && <User users={users}/>}
        {products && products.length > 0 && page === 3 && <Product product={products}/>}
        {page === 4 && <Order order={order}/>}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Admin