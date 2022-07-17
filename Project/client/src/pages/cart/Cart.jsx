import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import { Notification } from '../../components/notification/Notification'
import { PopupAnimation } from '../../components/PopupAnimation/PopupAnimation'
import { getName } from '../../helpers/utils'
import { orderAdd, orderDelete, orderEnd, orderSub } from '../../redux/orderRedux'
import { publicRequest } from '../../requestAxios'
import "./cart.scss"

export const Cart = () => {
    const { listOrder, cost } = useSelector(state => state.order)
    const { currentUser } = useSelector(state => state.user)
    const dispatch =  useDispatch()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [info, setInfo] = useState({})
    const [dialog, setDialog] = useState(false)
    const [popup, setPopup] = useState(false)
    const handlePopup = ()=>{
        setDialog(!dialog)
    }
   
    const handleSubmit = (choose)=>{
        if(choose){
            if(name){
                let fullName = getName(name)
                info.firstName = fullName.firstname
                info.lastName = fullName.lastname
            }
            if(address) info.address = address
            if(phone) info.phone = phone
            let date = new Date()
            let list_Order = []
            listOrder.map((item, index)=>{
                list_Order.push({
                    product_id: item.id,
                    quantity: item.quantity,
                    color: item.color,
                    total_cost:parseInt(item.price.split(' - ')[0]) * ( 1 - item.discount /100) * item.quantity
                })
            })
            let order_cart = {
                order:list_Order,
                user_id: info.user_id||null,
                firstname: info.firstName,
                lastname: info.lastName,
                total_cost: cost + (cost*0.01 > 30000 ? cost*0.01 : 30000) - 15000,
                date: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
    
            }
            // console.log(order_cart);
            try {
                const res = publicRequest.post(`/api/order`, order_cart);
                console.log(res);
              } catch (err) {
                console.log(err);
              }
              dispatch(orderEnd())
              setDialog(!dialog)
              setPopup(!popup)
              setTimeout(() => setPopup(!popup), 1000);
        }
        setDialog(!dialog)
        
    }
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
            {dialog && <Notification check = {handleSubmit} data={{header:'Thông báo', body:'Bạn chắc chắn đặt hàng chứ!'}}></Notification>}
           {popup && <PopupAnimation data={{header:'SUCESS', body:"Đặt hàng thành công"}}/>}
            <Header />
            <div className="box padding___main">
                <h2 className='header__top'>Chi tiết giỏ hàng</h2>
                <div className="container">
                    <div className="productCart">
                        <div>
                            {
                                listOrder && listOrder.length ? listOrder.map(item => (
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
                                :
                                <></>
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
                                <p>-30000 đ</p>
                            </div>
                            <div className='total__cost'>
                                <p>Tổng cộng</p>
                                <p>{cost} đ</p>
                            </div>
                        </div>
                        <div className='user__cart'>
                            <h1>Thông tin khách hàng</h1>
                            <div className="input" >
                                <label htmlFor="">Họ và Tên</label>
                                <input id='cart-name' onKeyDown={e => { if (e.key === 'Enter') return }} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nhập họ tên" />
                            </div>
                            <div className="input" >
                                <label htmlFor="">Số điện thoại</label>
                                <input id='cart-phone' onKeyDown={e => { if (e.key === 'Enter') return }} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="Nhập số điện thoại" />
                            </div>
                            <div className="input" >
                                <label htmlFor="">Địa chỉ</label>
                                <input id='cart-address' onKeyDown={e => { if (e.key === 'Enter') return }} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Nhập địa chỉ" />
                            </div>
                            <button onClick={handlePopup}>Đặt hàng ngay</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
