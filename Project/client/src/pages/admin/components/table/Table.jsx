import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import './table.scss'
import { privateRequest } from "../../../../requestAxios"
import moment from "moment"
import { useSelector } from "react-redux"
import { Notification } from "../../../../components/notification/Notification"
import { PopupAnimation } from "../../../../components/PopupAnimation/PopupAnimation"

function getThead(type){
    switch (type){
        case 'user':
            return [
                'ID',
                'Username',
                'Họ',
                'Tên',
                'Email',
                'Số điện thoại',
                'Địa chỉ',
                'Quyền'
            ]
        case 'product':
            return [
                'ID',
                'Hình ảnh',
                'Tên sản phẩm',
                'Giá',
                'Màu sắc',
                'Chi tiết',
                'Mô tả',
                'Giảm giá(%)',
            ]
        case 'order':
            return [
                'Order ID',
                'User ID',
                'Trạng thái',
                'Họ tên',
                'Số điện thoại',
                'Địa chỉ',
                'Tổng giá',
                'Ngày tạo'
            ]
    }
}

const Table = ({users, product, order}) => {
    // Hiển thị cái xác nhận và popup thông báo kết quả
    const [productDialog, setProductDialog] = useState(false)
    const [orderDialog, setOrderDialog] = useState(false)
    const [userDialog, setUserDialog] = useState(false)
    const [popup, setPopup] = useState(false)
    const [dataPopup, setDataPopup] = useState({})
    const [dataProductPopup, setDataProductPopup] = useState(0)
    const [dataOrderPopup, setDataOrderPopup] = useState(0)
    const [dataUserPopup, setDataUserPopup] = useState(0)
    const { currentUser } = useSelector(state => state.user)
    const [check, setCheck] = useState(false)
    let threadName = ""
    const navigate = useNavigate()
    if(users) threadName = 'user'
    if(product) threadName = 'product'
    if(order) threadName = 'order'

    const handleDeleteProduct = (choose)=>{
        if(choose){
            const index = product.findIndex(e => e.id === dataProductPopup)
            if(index < 0) return 
            product.splice(index, 1)
            setCheck(!check)
            try { 
                const res = privateRequest.delete(`/api/product/delete?id=${dataProductPopup}`, {
                    headers: {
                        authorization: JSON.stringify(currentUser.token)
                    }
                })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            setDataPopup({header: 'SUCCESS', body:'Xóa sản phẩm thành công'})
            setPopup(true)
            setTimeout(() => setPopup(false), 2000);
        }
        setProductDialog(!productDialog)
      
    }
    const [thead, setThead] = useState(getThead(threadName))
    const handleDeleteUser = (choose) => {
        if(choose){
            const index = users.findIndex(i => i.id === dataUserPopup)
            if(index < 0) return
            try {
                const res = privateRequest.delete(`/api/user/delete?id=${dataUserPopup}`, {
                    headers: {
                        authorization: JSON.stringify(currentUser.token)
                    }
                })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            setDataPopup({header: 'SUCCESS', body:'Xóa người dùng thành công'})
            setPopup(true)
            setTimeout(() => setPopup(false), 2000);
        }
        setUserDialog(!userDialog)
        setCheck(!check)
        
    }
    const handleDeleteOrder = (choose) =>{
        if(choose){
            const index = order.findIndex(i => i.order.order_id === dataOrderPopup)
            if(index < 0) return 
            order.splice(index, 1)
            setCheck(!check)
            try {
                const res = privateRequest.delete(`/api/order/delete?id=${dataOrderPopup}`, {
                    headers: {
                        authorization: JSON.stringify(currentUser.token)
                    }
                })
                console.log(res);
            } catch (error) {
                console.log(error);
            }
            setDataPopup({header: 'SUCCESS', body:'Xóa đơn hàng thành công'})
            setPopup(true)
            setTimeout(() => setPopup(false), 2000);
        }
        setOrderDialog(!orderDialog)
    }
    return (
        <div className='table'>
            {product &&
            <>
            {productDialog && <Notification check = {handleDeleteProduct} data={{header:'Thông báo', body:'Vui lòng xác nhận thay đổi!'}}></Notification>}
            {popup && <PopupAnimation data={{header:dataPopup.header, body:dataPopup.body}}/>}
            <div className="table-body">
                <table>
                    <thead>
                        <tr>
                            <th className='col1'>STT</th>
                            {thead && thead.length > 0 && thead.map(i=>(
                                <th>{i}</th>
                            ))}
                            <th>
                                <Link style={{color: 'white', textDecoration:'none'}} to={'/admin/newproduct'}>
                                Thêm mới
                                </Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                product && product.length > 0 && product.map((product, index)=>(
                                    <tr>
                                        <td className='col1'>{index + 1}</td>
                                        <td>{product.id}</td>
                                        <td style={{maxWidth:"80px"}}><img src={product.path[0]} alt="" /></td>
                                        <td style={{maxWidth:"130px", paddingLeft: "15px"}}>{product.name}</td>
                                        <td style={{maxWidth:"70px"}}>{product.price}</td>
                                        <td style={{maxWidth:"130px"}}>{product.color.join(', ')||'Mặc định'}</td>
                                        <td style={{maxWidth:"130px"}}>{product.detail[0]+" "+ product.detail[1]+ " " + product.detail[2]}</td>
                                        <td className='td2' style={{maxWidth:"200px",maxHeight:"100px", textOverflow: "ellipsis"}}>{product.descripion[0] || " "+ product.descripion[1] || " "}</td>
                                        <td >{product.discount}</td>
                                        <td className='action'>
                                            <i class="fa-solid fa-wrench" onClick={()=>{navigate(`./productChange/${product.id}`)}}></i>
                                            <i class="fa-solid fa-trash-can" onClick={()=>{setProductDialog(!productDialog); setDataProductPopup(product.id)}}></i>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div></>}
            {users &&
            <>
            {userDialog && <Notification check = {handleDeleteUser} data={{header:'Thông báo', body:'Vui lòng xác nhận thay đổi!'}}></Notification>}
            {popup && <PopupAnimation data={{header:dataPopup.header, body:dataPopup.body}}/>}
            <div className="table-body">
                <table>
                    <thead>
                        <tr>
                            <th className='col1'>STT</th>
                            {thead && thead.length > 0 && thead.map(i=>(
                                <th>{i}</th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                users && users.length > 0 && users.map((user, index)=>(
                                    <tr>
                                        <td className='col1'>{index + 1}</td>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.isAdmin ? "Admin": "User"}</td>
                                        <td className='action'>
                                            <i class="fa-solid fa-wrench"></i>
                                            <i class="fa-solid fa-trash-can" onClick={()=>{setUserDialog(!userDialog); setDataUserPopup(user.id)}}></i>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div></>}
            {order &&
            <>
            {popup && <PopupAnimation data={{header:dataPopup.header, body:dataPopup.body}}/>}
            {orderDialog && <Notification check = {handleDeleteOrder} data={{header:'Thông báo', body:'Vui lòng xác nhận thay đổi!'}}></Notification>}
            <div className="table-body">
                <table>
                    <thead>
                        <tr>
                            <th className='col1'>STT</th>
                            {thead && thead.length > 0 && thead.map(i=>(
                                <th>{i}</th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                order && order.length > 0 && order.map((o, index)=>(
                                    <tr key={index}>
                                        <td className='col1'>{index + 1}</td>
                                        <td>{o.order.order_id}</td>
                                        <td>{o.user.user_id}</td>
                                        <td>{o.order.status}</td>
                                        <td>{(o.user.firstname || '')  + ' ' + (o.user.lastname || '')}</td>
                                        <td>{o.user.phone}</td>
                                        <td>{o.user.address}</td>
                                        <td>{o.order.total_cost}</td>
                                        <td>{moment(o.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                                        <td className='action'>
                                            <i class="fa-solid fa-wrench" onClick={()=>{navigate('/admin/order-detail/' + o.order.order_id)}}></i>
                                            <i class="fa-solid fa-trash-can" onClick={()=>{setOrderDialog(!orderDialog);setDataOrderPopup(o.order?.order_id)}}></i>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div></>}
        </div>
    )
}

export default Table