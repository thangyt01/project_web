import "./profiles.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';

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
                    <div className="content-head">Hồ sơ của tôi</div>
                    <div className="content-wapper">
                        <div className="item">
                            <label className="item-head">Họ và tên</label>
                            <p className="item-content">Tran Van Quang</p>
                        </div>

                        <div className="item">
                            <label className="item-head">Số điện thoại</label>
                            <p className="item-content">0968207011</p>
                        </div>

                        <div className="item">
                            <label className="item-head">Địa chỉ</label>
                            <p className="item-content">Vu Ban - Nam Dinh</p>
                        </div>

                        <div className="item">
                            <label className="item-head">Email</label>
                            <p className="item-content">quang01696103588@gmail.com</p>
                        </div>
                    </div>
                    <button className="content-btn_update">Chỉnh sửa</button>
                    <button className="content-btn_save">Lưu</button>

                </div>
            </div>
        </div>
    )
}

export default Profiles