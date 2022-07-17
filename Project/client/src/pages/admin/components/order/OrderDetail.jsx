import moment from "moment"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import Footer from "../../../../components/footer/Footer"
import { Header } from "../../../../components/header/Header"
import { COLOR_STATUS, DEFAULT_IMAGE_URL } from "../../../../helpers/utils"
import { privateRequest } from "../../../../requestAxios"

const OrderDetail = () => {
    const [order, setOrder] = useState({})
    const location = useLocation();
    let id = location.pathname.split("/")[3];
    const {currentUser} = useSelector(state => state.user)

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
    const handleChange = async (id, e)=>{
        console.log(e.target.value)//value
        // Hiển thị popup xác nhận thay đổi
        // Nếu có thì gọi api
        // Nếu không thì revert về trạng thái cũ
        const data = {
           status: e.target.value
        }
        try {
            const res = await privateRequest.post('api/order/update?id='+id, data, {
                headers: {
                    authorization: JSON.stringify(currentUser.token),
                }
            })
        } catch (error) {
            if(error.response.data.code === 200){
                // Hiển thị popup cập nhật trạng thái đơn hàng thành công
            } else {
                // Hiển thị popup cập nhật trạng thái đơn hàng thất bại
            }
        }
    }
    return (
        <div className="order-detail">
            <Header />
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
                                <select name="" id="" onChange={(e)=>handleChange(order.order?.order_id, e)}>
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