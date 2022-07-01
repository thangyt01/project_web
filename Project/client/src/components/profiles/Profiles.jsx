import "./profiles.scss"
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAvatar, getName } from "../../helpers/utils";
import { privateRequest } from "../../requestAxios";

const Profiles = () => {
    const {currentUser} = useSelector(state => state.user)
    const [state1, setState1] = useState(false);
    const [state2, setState2] = useState(false);
    const [state3, setState3] = useState(false);
    const [state4, setState4] = useState(false);

    const [name, setName] = useState(currentUser.profile.fullName);
    const [phone, setPhone] = useState(currentUser.profile.phone);
    const [address, setAddress] = useState(currentUser.profile.address);
    const [email, setEmail] = useState(currentUser.profile.email);

    const handleUpdateUser = async () => {
        try {
            let _name = getName(name)
            await privateRequest.put('/api/user/update?id=' + currentUser.profile.id, {..._name, phone, address, email})
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(()=>{
        const getProfile = async()=>{
            try {
                const res = await privateRequest.get('/api/user?id='+ currentUser.profile.id)
            } catch (error) {
                const res = error.response.data
                if(res.code == 200){
                    setName(res.data.firstname + ' ' + res.data.lastname)
                    setPhone(res.data.phone)
                    setAddress(res.data.address)
                    setEmail(res.data.email)
                }                
            }
        }
        getProfile()
    }, [])
    
    return (
        <div className="profile">
            <div className="wrapper">
                <div className="sideBar">
                    <div className="sideBar-header">
                        <div className="icon">
                            <p>{getAvatar(name)}</p>
                        </div>
                        <p>
                            {currentUser.profile.username}
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
                                {
                                    state1 ?
                                    <input type="text" onChange={(e)=>{setName(e.target.value)}} defaultValue={name}/>
                                    :
                                    <span>{name}</span> 
                                }
                                <i onClick={()=>{setState1(!state1)}} className="fa-solid fa-pen"></i>
                            </p>
                        </div>

                        <div className="item">
                            <label className="item-head">Số điện thoại:</label>
                            <p className="item-content">
                                {
                                    state2 ?
                                    <input onChange={(e)=>{setPhone(e.target.value)}} type="text" defaultValue={phone}/>
                                    :
                                    <span>{phone}</span> 
                                }
                                <i onClick={()=>{setState2(!state2)}} className="fa-solid fa-pen"></i>
                            </p>
                        </div>
                        
                        <div className="item">
                            <label className="item-head">Địa chỉ:</label>
                            <p className="item-content">
                                {
                                    state3 ?
                                    <input onChange={(e)=>{setAddress(e.target.value)}} type="text" defaultValue={address}/>
                                    :
                                    <span>{address}</span> 
                                }
                                <i onClick={()=>{setState3(!state3)}} className="fa-solid fa-pen"></i>
                            </p>
                        </div>

                        <div className="item">
                            <label className="item-head">Email:</label>
                            <p className="item-content">
                                {
                                    state4 ?
                                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" defaultValue={email}/>
                                    :
                                    <span>{email}</span> 
                                }
                                <i onClick={()=>{setState4(!state4)}} className="fa-solid fa-pen"></i>
                            </p>
                        </div>
                    </div>
                    <div className="content-footer">
                        <button className="content-btn_save" onClick={handleUpdateUser}>Lưu</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Profiles