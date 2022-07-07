import React from 'react'
import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'

import "./cart.scss"
export const Cart = () => {
  return (
    <div>
        <Header/>
        <div className="box padding___main">
            <p>Chi tiết giỏ hàng</p>
            <div className="container">
                <div className="productCart">
                    <div className='item'>
                        <div className='image'>
                            <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" />
                        </div>
                        <div className='productCart'>
                            <div className="name">
                                <p>dong ho de dong ho dep dong ho dep dong ho depp</p>
                            </div>
                            <div className="color">
                                màu
                            </div>
                            <div className="priceCart">
                                250000
                            </div>
                        </div>
                        <div className="title1">
                            <div className="quantity">
                                <div className='button'>-</div>
                                <span>2</span>
                                <div className='button'>+</div>
                            </div>
                        </div>
                        <div className="deleteBox">
                            <div className='deleteButton'>X</div>
                        </div>
                    </div>
                </div>
                <div className="userInfo">
                    <h1>Thoong tin khach hang</h1>
                    <div className="form">
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                    </div>
                    <button className='cartSubmit'>Dat hang     </button>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}
