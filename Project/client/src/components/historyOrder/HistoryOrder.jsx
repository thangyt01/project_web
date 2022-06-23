import "./historyOrder.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";

const HistoryOrder = () => {
    return (
        <div className="profile">
            <div className="wrapper">
                <div className="sideBar">
                    <div className="sideBar-header">
                        <div className="icon">
                            <p>TV</p>
                        </div>
                        <p>
                            quang1501
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
                        <div className="item-history">
                            <label className="item-head">Mã đơn hàng: #642362</label>
                            <div className="item-content">
                                <div className="product-history">
                                    <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" className="product-img" />
                                    <div className="product-description">
                                        <p className="p1">Yêu thích Đồng hồ mặt vuông LED phổ biến kỹ thuật số cho học sinh hshjsdhjfshjdfshjhjjkdshjfshjdfsjh</p>
                                        <p className="p2">Màu black</p>
                                    </div>
                                    <div className="product-cost">200.000</div>
                                </div>

                                <div className="product-history">
                                    <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" className="product-img" />
                                    <div className="product-description">
                                        <p className="p1">Yêu thích Đồng hồ mặt vuông LED phổ biến kỹ thuật số cho học sinh hshjsdhjfshjdfshjhjjkdshjfshjdfsjh</p>
                                        <p className="p2">Màu black</p>
                                    </div>
                                    <div className="product-cost">200.000</div>
                                </div>
                            </div>
                            <div className="item-footer">
                                <p className="item-footer-content">Tổng tiền</p>
                                <p className="cost">100.000Đ</p>
                            </div>
                            {/* <div className="clear"></div> */}
                        </div>
                        
                        <div className="item-history">
                            <label className="item-head">Mã đơn hàng: #642362</label>
                            <div className="item-content">
                                <div className="product-history">
                                    <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" className="product-img" />
                                    <div className="product-description">
                                        <p className="p1">Yêu thích Đồng hồ mặt vuông LED phổ biến kỹ thuật số cho học sinh hshjsdhjfshjdfshjhjjkdshjfshjdfsjh</p>
                                        <p className="p2">Màu black</p>
                                    </div>
                                    <div className="product-cost">200.000</div>
                                </div>

                                <div className="product-history">
                                    <img src="https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn" alt="" className="product-img" />
                                    <div className="product-description">
                                        <p className="p1">Yêu thích Đồng hồ mặt vuông LED phổ biến kỹ thuật số cho học sinh hshjsdhjfshjdfshjhjjkdshjfshjdfsjh</p>
                                        <p className="p2">Màu black</p>
                                    </div>
                                    <div className="product-cost">200.000</div>
                                </div>
                            </div>
                            <div className="item-footer">
                                <p className="item-footer-content">Tổng tiền</p>
                                <p className="cost">100.000Đ</p>
                            </div>
                            {/* <div className="clear"></div> */}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HistoryOrder