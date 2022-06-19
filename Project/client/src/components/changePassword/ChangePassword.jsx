import "./changePassword.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';

const ChangePassword = () => {
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
                        <div>
                            <PersonIcon></PersonIcon>
                            <p>Thông tin cá nhân</p>
                        </div>

                        <div>
                            <HistoryIcon></HistoryIcon>
                            <p>Lịch sử mua hàng</p>
                        </div>

                        <div>
                            <LockIcon></LockIcon>
                            <p>Thay đổi mật khẩu</p>
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="content-head">Thay đổi mật khẩu</div>
                    <div className="content-wapper">
                        <div className="item">
                            <label className="item-head">Nhập mật khẩu</label>
                            <input className="item-content"></input>
                        </div>

                        <div className="item">
                            <label className="item-head">Nhập lại mật khẩu</label>
                            <input className="item-content"></input>
                        </div>
                    </div>
                    <button className="content-btn_update">Chỉnh sửa</button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword