import "./profiles.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";

const Profiles = () => {
    // const handleUpdate = () =>{
    //     let itemContent = window.getElementByClassName('item-content')
    //     itemContent.addEventListener('click', function(){

    //     })
    // }
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
                            <div style={{ backgroundColor: '#125B50', color: '#fff' }}>
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
                            <div>
                                <LockIcon></LockIcon>
                                <p>Thay đổi mật khẩu</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="content">
                    <div className="content-head">Hồ sơ của tôi</div>
                    <div className="content-wapper">
                        <div className="item">
                            <label className="item-head">Họ và tên:</label>
                            <p className="item-content">
                                <input type="text" />
                                Tran Van Quang <i className="fa-solid fa-pen"></i></p>
                        </div>

                        <div className="item">
                            <label className="item-head">Số điện thoại:</label>
                            <p className="item-content">
                                <input type="text" />
                                0968207011 <i className="fa-solid fa-pen"></i></p>
                        </div>

                        <div className="item">
                            <label className="item-head">Địa chỉ:</label>
                            <p className="item-content">
                                <input type="text" />
                                Vu Ban - Nam Dinh <i className="fa-solid fa-pen"></i></p>
                        </div>

                        <div className="item">
                            <label className="item-head">Email:</label>
                            <p className="item-content">
                                <input type="text" defaultValue={'quang01696103588@gmail.com'}/>
                                quang01696103588@gmail.com <i className="fa-solid fa-pen"></i></p>
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

export default Profiles