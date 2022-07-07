import { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { privateRequest } from '../../requestAxios'
import './admin.scss'
import User from './components/User'
import { useSelector } from 'react-redux'

const Admin = ({choose}) => {
  const { currentUser } = useSelector(state => state.user)
  const [users, setUsers] = useState([])
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
  return (
    <div className='admin'>
      <Header></Header>
      <div className="content padding___main">
        <p className="admin-header">Quản lý người dùng</p>
        <div className='over'>
          <div className="selected1">
            <p>Tổng quan</p>
            <p className={choose === 2 && 'choose'}>Người dùng</p>
            <p>Sản phẩm</p>
            <p>Đơn hàng</p>
          </div>
        </div>
        {users && users.length > 0 && <User users={users}/>}
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Admin