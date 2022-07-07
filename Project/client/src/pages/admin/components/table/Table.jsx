import { useState } from 'react'
import './table.scss'

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

            ]
        case 'order':
            return [

            ]
    }
}

const Table = ({users, product, order}) => {
    const [thead, setThead] = useState(getThead('user'))
    return (
        <div className='table'>
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
            </div>
        </div>
    )
}

export default Table