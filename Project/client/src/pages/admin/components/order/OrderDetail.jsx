import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Footer from "../../../../components/footer/Footer"
import { Header } from "../../../../components/header/Header"
import { Notification } from "../../../../components/notification/Notification"
import { PopupAnimation } from "../../../../components/PopupAnimation/PopupAnimation"
import { COLOR_STATUS, DEFAULT_IMAGE_URL } from "../../../../helpers/utils"
import { privateRequest } from "../../../../requestAxios"

const OrderDetail = () => {
    const [order, setOrder] = useState({})
    const location = useLocation();
    let id = location.pathname.split("/")[3];
    const {currentUser} = useSelector(state => state.user)
    const [dialog, setDialog] = useState(false)
    const [popup, setPopup] = useState(false)
    const [state, setState] = useState({})
    const [dataPopup, setDataPopup] = useState({})
    const handlePopup = (id, e)=>{
        setDialog(!dialog)
    }

    useEffect(()=>{
        const getDetailOrder = async ()=>{
            try {
                const res = await privateRequest.get("/api/order?id="+id, {
                    headers: {
                        authorization: JSON.stringify(currentUser.token),
                    }
                })
            } catch (error) {
                if(error.response.data.code === 200){
                    setOrder(error.response.data.data)
                }
            }
        }
        getDetailOrder()
    }, [id])
    const handleSubmit = async (choose)=>{
        if(choose){

            const data = {
               status: state.e.target.value
            }
            try {
                const res = await privateRequest.put('/api/order/update?id='+state.id, data, {
                    headers: {
                        authorization: JSON.stringify(currentUser.token),
                    }
                })
            } catch (error) {
                if(error.response.data.code === 200){
                    setDataPopup({header: 'SUCCESS', body:'Cập nhật đơn hàng thành công'})
                } else {
                    setDataPopup({header: 'ERROR', body:'Cập nhật đơn hàng thất bại'})
                }
            }
            setPopup(true)
            setTimeout(() => setPopup(false), 2000);
    
        }
        setDialog(!dialog)
    }
      
    return (
        <div className="order-detail">
            <Header />
            {dialog && <Notification check = {handleSubmit} data={{header:'Thông báo', body:'Vui lòng xác nhận thay đổi!'}}></Notification>}
            {popup && <PopupAnimation data={{header:dataPopup.header, body:dataPopup.body}}/>}
            <div className="main padding___main">
                <div className="wrapper">
                    <div className="top1">
                        <h1>Chi tiết đơn hàng</h1>
                    </div>
                    <div className="content">
                        <div className="element order-top">
                            <h2 className="order-code">Mã đơn hàng: #{order.order?.order_id}</h2>
                            <h2 className="status">
                                {/* Trạng thái: {order.order?.status} */}
                                <select name="" id="" onChange={(e)=>{handlePopup(order.order?.order_id, e); setState({id:order.order.order_id, e:e})}}>
                                    <option value={'Đặt Hàng'} selected={order.order?.status === 'Đặt Hàng'} style={{color: `${COLOR_STATUS['Đặt Hàng']}`}}>Đặt Hàng</option>
                                    <option value={'Xác Nhận'} selected={order.order?.status === 'Xác Nhận'} style={{color: `${COLOR_STATUS['Xác Nhận']}`}}>Xác Nhận</option>
                                    <option value={'Hủy'} selected={order.order?.status === 'Hủy'} style={{color: `${COLOR_STATUS['Hủy']}`}}>Hủy</option>
                                    <option value={'Hoàn Thành'} selected={order.order?.status === 'Hoàn Thành'} style={{color: `${COLOR_STATUS['Hoàn Thành']}`}}>Hoàn Thành</option>
                                </select>
                            </h2>
                            <h2>Ngày tạo: {moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss')}</h2>
                        </div>
                        <div className="element order-user">
                            <h2>Thông tin khách hàng</h2>
                            <h3>Họ tên: <span>{order.user?.firstname + ' ' + order.user?.lastname}</span></h3>
                            <h3>Số điện thoại: <span>{order.user?.phone || ''}</span></h3>
                            <h3>Địa chỉ: <span>{order.user?.address || ''}</span></h3>
                        </div>
                        <div className="element order-product">
                            <h2>Danh sách sản phẩm</h2>
                            <div className="div">
                                {
                                    Object.keys(order).length && order.order.detail.map(product => (
                                        <div className="product-history">
                                            <img src={product.image || DEFAULT_IMAGE_URL} alt="" className="product-img" />
                                            <div className="product-description">
                                                <Link style={{ color: "black", textDecoration: 'none' }} to={'/product/' + product.product_id}>
                                                    <p className="p1">{product.name}</p>
                                                </Link>
                                                <div>
                                                    <p className="p2">số lượng: {product.quantity}</p>
                                                    {product.color && <p className="p2">màu sắc: {product.color}</p>}
                                                </div>
                                            </div>
                                            <div className="product-cost">{product.total_cost} đ</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="item-footer">
                                <p className="item-footer-content">Tổng tiền</p>
                                <p className="cost">{order.order?.total_cost} đ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderDetail