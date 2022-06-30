import "./changePassword.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAvatar } from "../../helpers/utils";

const ChangePassword = () => {
    const {currentUser} = useSelector(state => state.user)
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
                            <div>
                                <HistoryIcon></HistoryIcon>
                                <p>Lịch sử mua hàng</p> 
                            </div>
                        </Link>
                        
                        <Link id="link" to={'/user/change-password'}>
                            <div style={{backgroundColor : '#125B50', color : '#fff'}}>
                                <LockIcon></LockIcon>
                                <p>Thay đổi mật khẩu</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="content">
                    <div className="content-head">Thay đổi mật khẩu</div>
                    <div className="content-wapper1">
                        <div className="item1">
                            <label className="item-head">Nhập mật khẩu</label>
                            <input className="item-content"></input>
                        </div>

                        <div className="item1">
                            <label className="item-head">Nhập lại mật khẩu</label>
                            <input className="item-content"></input>
                        </div>
                    </div>
                    <div className="content-footer">
                        <button className="content-btn_save">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword