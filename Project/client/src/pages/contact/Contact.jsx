import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import './contact.scss'

const Contact = ({selected}) => {
    return (
        <div className='contact'>
            <Header selected={selected}/>
            <div className="container1">
                <div className="header__contact padding___main">
                    <div>
                        <h2>Liên Hệ</h2> 
                        <p>Trang chủ /<b>Liên hệ</b></p>
                    </div>
                </div>
                <div className="content">
                    <div className="content__top">
                        <p>BK WATCH – Kênh mua sắm đồng hồ cao cấp</p>
                        <p>Địa chỉ: Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội.</p>
                        <b>Hotline: 0906052125</b>
                        <b>CSKH: 0906052125</b>
                        <h2>Liên hệ với chúng tôi</h2>
                        <div>
                            <input type="text" placeholder='Họ và tên'/>
                            <input type="text" placeholder='Email'/>
                        </div>
                        <div>
                            <input type="text" placeholder='Số điện thoại'/>
                            <input type="text" placeholder='Địa chỉ'/>
                        </div>
                        <div>
                            <input type="text" placeholder='Lời nhắn'/>
                        </div>
                        <div>
                            <p className='btn'>Gửi</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Contact