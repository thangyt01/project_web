import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { orderAdd, orderDelete, orderSub } from '../../redux/orderRedux'

import "./cart.scss"
export const Cart = () => {
    const { listOrder, cost } = useSelector(state => state.order)
    const { currentUser } = useSelector(state => state.user)
    const dispatch =  useDispatch()
    const [info, setInfo] = useState({})
    useEffect(()=>{
        if(currentUser && currentUser.profile){
            document.getElementById('cart-name').value = currentUser.profile.fullName
            document.getElementById('cart-phone').value = currentUser.profile.phone
            document.getElementById('cart-address').value = currentUser.profile.address
            setInfo({
                user_id: currentUser.profile?.id,
                firstName: currentUser.profile?.firstName,
                lastName: currentUser.profile?.lastName,
                phone: currentUser.profile?.phone,
                address: currentUser.profile?.address,
            })
        }
    }, [currentUser])
    const handleChangeQuantity = (item, type) => {
        if(type === 'sub'){
            dispatch(orderSub(item))
        }else if(type === 'add'){
            dispatch(orderAdd(item))
        }else{
            dispatch(orderDelete(item))
        }
    }
    return (
        <div>
            <Header />
            <div className="box padding___main">
                <h2 className='header__top'>Chi tiết giỏ hàng</h2>
                <div className="container">
                    <div className="productCart">
                        <div>
                            {
                                listOrder && listOrder.length && listOrder.map(item => (
                                    <div className='item' key={item.id}>
                                        <div className='image'>
                                            <img src={item.image} alt="" />
                                            <div className='discount'>
                                                -{item.discount || 0}%
                                            </div>
                                        </div>
                                        <div className='productCart'>
                                            <div className="name">
                                                <p>{item.name}</p>
                                            </div>
                                            <div className="color">
                                                màu: {item.color}
                                            </div>
                                        </div>
                                        <div className="title1">
                                            <div className="quantity">
                                                <div className='button' onClick={()=>{handleChangeQuantity(item, 'sub')}}>-</div>
                                                <span>{item.quantity}</span>
                                                <div className='button' onClick={()=>{handleChangeQuantity(item, 'add')}}>+</div>
                                            </div>
                                            <div className="priceCart">
                                                {item.price} đ
                                            </div>
                                        </div>
                                        <div className="deleteBox">
                                            <div className='deleteButton' onClick={()=>{handleChangeQuantity(item, 'delete')}}>X</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="userInfo">
                        <div className='total__cart'>
                            <h1>Tóm tắt giỏ hàng</h1>
                            <div>
                                <p>Tổng tiền</p>
                                <p>{cost} đ</p>
                            </div>
                            <div>
                                <p>Phí ship</p>
                                <p>{cost*0.01 > 30000 ? cost*0.01 : 30000} đ</p>
                            </div>
                            <div>
                                <p>Giảm giá ship</p>
                                <p>-15000 đ</p>
                            </div>
                            <div className='total__cost'>
                                <p>Tổng cộng</p>
                                <p>{cost + (cost*0.01 > 30000 ? cost*0.01 : 30000) - 15000} đ</p>
                            </div>
                        </div>
                        <div className='user__cart'>
                            <h1>Thông tin khách hàng</h1>
                            <div className="input" >
                                <label htmlFor="">Họ và Tên</label>
                                <input id='cart-name' onKeyDown={e => { if (e.key === 'Enter') return }} onChange={(e) => setInfo(e.target.value)} type="text" placeholder="Nhập họ tên" />
                            </div>
                            <div className="input" >
                                <label htmlFor="">Số điện thoại</label>
                                <input id='cart-phone' onKeyDown={e => { if (e.key === 'Enter') return }} onChange={(e) => setInfo(e.target.value)} type="text" placeholder="Nhập số điện thoại" />
                            </div>
                            <div className="input" >
                                <label htmlFor="">Địa chỉ</label>
                                <input id='cart-address' onKeyDown={e => { if (e.key === 'Enter') return }} onChange={(e) => setInfo(e.target.value)} type="text" placeholder="Nhập địa chỉ" />
                            </div>
                            <button>Đặt hàng ngay</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
