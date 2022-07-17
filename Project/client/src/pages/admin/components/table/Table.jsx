import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import './table.scss'
import { privateRequest } from "../../../../requestAxios"
import moment from "moment"

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
    const [check, setCheck] = useState(false)
    let threadName = ""
    const navigate = useNavigate()
    if(users) threadName = 'user'
    if(product) threadName = 'product'
    if(order) threadName = 'order'
    const handleDeleteProduct = (item)=>{
         const index = product.findIndex(e => e.id == item)
         product.splice(index, 1)
         setCheck(!check)
        try { 
            const res = privateRequest.delete(`/api/product/delete?id=${item}`)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const [thead, setThead] = useState(getThead(threadName))
    return (
        <div className='table'>
            {product &&
            <>
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
                                            <i class="fa-solid fa-trash-can" onClick={()=>handleDeleteProduct(product.id)}></i>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div></>}
            {users &&
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
                                            <i class="fa-solid fa-trash-can"></i>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>}
            {order &&
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
                                    <tr>
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
                                            <i class="fa-solid fa-trash-can"></i>
                                        </td>
                                    </tr>
                                ))
                            }
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default Table