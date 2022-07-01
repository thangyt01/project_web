import "./changePassword.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkValidPass, getAvatar } from "../../helpers/utils";
import { useState } from "react";
import { privateRequest } from "../../requestAxios";


const ChangePassword = () => {
    const {currentUser} = useSelector(state => state.user)
    const [password, setPassword] = useState('')
    const [re_password, setRe_password] = useState('')

    const handleClick = async () => {
        if(checkValidPass(password, re_password)){
            try {
                await privateRequest.put('/api/user/update?id=' + currentUser.profile.id, {password})
            } catch (error) {
                alert(error.response.data.message)
            }
        }
    }
    
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
                            <input onChange={e=>setPassword(e.target.value)} className="item-content"></input>
                        </div>

                        <div className="item1">
                            <label className="item-head">Nhập lại mật khẩu</label>
                            <input onChange={e=>setRe_password(e.target.value)} className="item-content"></input>
                        </div>
                    </div>
                    <div className="content-footer">
                        <button onClick={handleClick}className="content-btn_save">Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword