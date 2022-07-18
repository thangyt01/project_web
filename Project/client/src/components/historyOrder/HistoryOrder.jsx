import "./historyOrder.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { privateRequest } from "../../requestAxios";
import { COLOR_STATUS, getAvatar } from "../../helpers/utils";
import { useSelector } from "react-redux";

const HistoryOrder = () => {
    const [history, setHistory] = useState([])
    const {currentUser} = useSelector(state => state.user)

    useEffect(() => {
        const getHistory = async () => {
            try{
                const res = await privateRequest.get(`/api/order/get_user_order`,{
                    headers: {
                        authorization: JSON.stringify(currentUser.token),
                    }
                });
                setHistory(res.data);
            } catch(err){
                setHistory(err.response.data.data.orders)
            }
        }
        getHistory();
    }, [currentUser.profile.id])
    
    return (
        <div className="profile">
            <div className="wrapper">
                <div className="sideBar">
                    <div className="sideBar-header">
                        <div className="icon">
                            <p>{getAvatar(currentUser.profile.fullName)}</p>
                        </div>
                        <p>
                            {currentUser.profile.username}
                        </p>
                    </div>
                    <div className="sideBar-content">
                        <Link id="link" to={'/user'}>
                            <div>
                                <PersonIcon></PersonIcon>  
                                <p>Thông tin cá nhân</p> 
                            </div>
                        </Link>

                        <Link id="link" to={'/user/history-order'}>
                            <div style={{backgroundColor : '#125B50', color : '#fff'}}>
                                <HistoryIcon></HistoryIcon>
                                <p>Lịch sử mua hàng</p> 
                            </div>
                        </Link>
                        
                        <Link id="link" to={'/user/change-password'}>
                            <div>
                                <LockIcon></LockIcon>
                                <p>Thay đổi mật khẩu</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="content">
                    <div className="content-head">Lịch sử mua hàng</div>
                    <div className="content-wapper">
                        {
                            history.map(h =>(
                                <div className="item-history">
                                    <div className="top__">
                                        <label className="item-head">Mã đơn hàng: #{h.order_id}</label>
                                        <p className="status" style={{color: `${COLOR_STATUS[h.status]}`}}>{h.status}</p>
                                    </div>
                                    <div className="item-content">
                                        {
                                            h.detail.map(product =>(
                                                <div className="product-history">
                                                    <img src={product.image} alt="" className="product-img" />
                                                    <div className="product-description">
                                                        <Link style={{color: "black", textDecoration: 'none'}} to={'/product/'+product.product_id}>
                                                        <p className="p1">{product.name}</p>
                                                        </Link>
                                                        <div>
                                                            <p className="p2">số lượng: {product.quantity}</p>
                                                            {product.color&&<p className="p2">màu sắc: {product.color}</p>}
                                                        </div>
                                                    </div>
                                                    <div className="product-cost">{product.total_cost} đ</div>
                                                </div>
                                            ))                                        }
                                    </div>
                                    <div className="item-footer">
                                        <p className="item-footer-content">Tổng tiền</p>
                                        <p className="cost">{h.total_cost} đ</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryOrder