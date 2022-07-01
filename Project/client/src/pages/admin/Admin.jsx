import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import './admin.scss'
import User from './components/User'

const Admin = () => {
  return (
    <div className='admin'>
      <Header></Header>
      <div className="content padding___main">
        <p className="admin-header">Quản lý người dùng</p>
        <User/>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default Admin