import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'

import "./cart.scss"
export const Cart = () => {
    const [info, setInfo] = useState({})
    return (
    <div>
        <Header/>
        <div className="box padding___main">
            <h2 className='header__top'>Chi tiết giỏ hàng</h2>
            <div className="container">
                <div className="productCart">
                    <div className='item'>
                        <div className='image'>
                            <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" />
                            <div className='discount'>
                                20%
                            </div>
                        </div>
                        <div className='productCart'>
                            <div className="name">
                                <p>dong ho de dong ho dep dong ho dep dong ho depp</p>
                            </div>
                            <div className="color">
                                màu: xanh
                            </div>
                        </div>
                        <div className="title1">
                            <div className="quantity">
                                <div className='button'>-</div>
                                <span>2</span>
                                <div className='button'>+</div>
                            </div>
                            <div className="priceCart">
                                250000 đ
                            </div>
                        </div>
                        <div className="deleteBox">
                            <div className='deleteButton'>X</div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='image'>
                            <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" />
                            <div className='discount'>
                                20%
                            </div>
                        </div>
                        <div className='productCart'>
                            <div className="name">
                                <p>dong ho de dong ho dep dong ho dep dong ho depp</p>
                            </div>
                            <div className="color">
                                màu: xanh
                            </div>
                        </div>
                        <div className="title1">
                            <div className="quantity">
                                <div className='button'>-</div>
                                <span>2</span>
                                <div className='button'>+</div>
                            </div>
                            <div className="priceCart">
                                250000 đ
                            </div>
                        </div>
                        <div className="deleteBox">
                            <div className='deleteButton'>X</div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='image'>
                            <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" />
                            <div className='discount'>
                                20%
                            </div>
                        </div>
                        <div className='productCart'>
                            <div className="name">
                                <p>dong ho de dong ho dep dong ho dep dong ho depp</p>
                            </div>
                            <div className="color">
                                màu: xanh
                            </div>
                        </div>
                        <div className="title1">
                            <div className="quantity">
                                <div className='button'>-</div>
                                <span>2</span>
                                <div className='button'>+</div>
                            </div>
                            <div className="priceCart">
                                250000 đ
                            </div>
                        </div>
                        <div className="deleteBox">
                            <div className='deleteButton'>X</div>
                        </div>
                    </div>
                    <div className='item'>
                        <div className='image'>
                            <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" />
                            <div className='discount'>
                                20%
                            </div>
                        </div>
                        <div className='productCart'>
                            <div className="name">
                                <p>dong ho de dong ho dep dong ho dep dong ho depp</p>
                            </div>
                            <div className="color">
                                màu: xanh
                            </div>
                        </div>
                        <div className="title1">
                            <div className="quantity">
                                <div className='button'>-</div>
                                <span>2</span>
                                <div className='button'>+</div>
                            </div>
                            <div className="priceCart">
                                250000 đ
                            </div>
                        </div>
                        <div className="deleteBox">
                            <div className='deleteButton'>X</div>
                        </div>
                    </div>
                </div>
                <div className="userInfo">
                    <div className='total__cart'>
                        <h1>Tóm tắt giỏ hàng</h1>
                        <div>
                            <p>Tổng tiền</p>
                            <p>200000 đ</p>
                        </div>
                        <div>
                            <p>Phí ship</p>
                            <p>15000 đ</p>
                        </div>
                        <div>
                            <p>Giảm giá ship</p>
                            <p>-15000 đ</p>
                        </div>
                        <div className='total__cost'>
                            <p>Tổng cộng</p>
                            <p>100000 đ</p>
                        </div>
                    </div>
                    <div className='user__cart'>
                        <h1>Thông tin khách hàng</h1>
                        <div className="input" >
                            <label htmlFor="">Họ và Tên</label>
                            <input onKeyDown={e => {if(e.key === 'Enter') return}} onChange={(e)=>setInfo(e.target.value)} type="text" placeholder="Nhập họ tên" />
                        </div>
                        <div className="input" >
                            <label htmlFor="">Số điện thoại</label>
                            <input onKeyDown={e => {if(e.key === 'Enter') return}} onChange={(e)=>setInfo(e.target.value)} type="text" placeholder="Nhập số điện thoại" />
                        </div>
                        <div className="input" >
                            <label htmlFor="">Địa chỉ</label>
                            <input onKeyDown={e => {if(e.key === 'Enter') return}} onChange={(e)=>setInfo(e.target.value)} type="text" placeholder="Nhập địa chỉ" />
                        </div>
                        <button>Đặt hàng ngay</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
