import "./header.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import { IconButton } from "@mui/material";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        color: '#fff',
    },
}));

export const Header = ({ selected }) => {
    const dispatch = useDispatch()
    const [hiden, setHiden] = useState(true)
    const [popupLogin, setPopupLogin] = useState(0)

    const handleHiden = () => {  
        setHiden(!hiden)
    }

    const handlePopupLogin = (value) => {        
        if(!popupLogin){
            document.querySelector('body').style.overflowY = 'hidden'
        } else{
            document.querySelector('body').style.overflowY = 'scroll'
        }
        setPopupLogin(value)
    }

    const handleClickMenu = () => {
        const bottom___left = document.querySelector(".bottom___left")
        bottom___left.classList.toggle('add')
    }

    return (
        <div className={"header"}>
            <div className="wrapper">
                <div className="top padding___main">
                    <div className="top___left">Bk watch</div>
                    <div className="top___center">Hello summer, sale lớn bất ngờ !!</div>
                    <div className="top___right">
                        <ul>
                            <li><PhoneIcon></PhoneIcon> <span className="hidden___tablet" style={{ marginLeft: '5px' }}>0906 03 5225</span></li>
                            <li onClick={() => { handlePopupLogin(1) }}><PersonIcon></PersonIcon></li>
                            <li>
                                <IconButton aria-label="cart">
                                    <StyledBadge badgeContent={4}>
                                        <ShoppingCartIcon id='shoppingCart' />
                                    </StyledBadge>
                                </IconButton>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={`bottom align-item___center ${selected !== 1 ? "first":""}`}>
                    <div className="bottom___left" onClick={handleClickMenu}>
                        <ul>
                            <li className={`${selected === 1 ? "choose":""}`}>Trang chủ</li>
                            <li className={`${selected === 2 ? "choose":""}`}>Sản phẩm</li>
                            <li className={`${selected === 3 ? "choose":""}`}>Liên hệ</li>
                            <li className={`${selected === 4 ? "choose":""}`}>Về chúng tôi</li>
                        </ul>
                        <IconButton aria-label="menu" className="padding__side">
                            <MenuIcon className="menuIcon"></MenuIcon>
                        </IconButton>
                    </div>
                    <div className="bottom___right">
                        <div className="searchContainer align-item___center">
                            <input type="text" className="searchInput" />
                            <IconButton aria-label="search" className="padding__side">
                                <SearchIcon></SearchIcon>
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
            {!popupLogin? <></> : 
                <div className="fill" >
                    <div className="fill2" onClick={()=>{ handlePopupLogin(0) }}></div>
                    <div className="exit" onClick={() => { handlePopupLogin(0) }}>
                        <IconButton aria-label="exit">
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </div>
                    {popupLogin === 1 ? <div className="login same">
                        <div className="login__left" style={{ background: "url('https://img.freepik.com/free-psd/presentation-back-front-smartwatches-with-screen-mock-up_23-2148787550.jpg?t=st=1653904478~exp=1653905078~hmac=d8c3f665f41ac9f899b82afa0b3156cfe414315df2c615c7040130167c175a87&w=1060') no-repeat center center / cover" }}>
                        </div>
                        <div className="login__right">
                            <div className="top">
                                <h2>Đăng Nhập</h2>
                                <div>
                                    <p>Bạn có tài khoản chưa?</p>
                                    <p className="registerNow" onClick={() => { handlePopupLogin(2) }}>Đăng ký ngay</p>
                                </div>
                            </div>
                            <div className="login__container" >
                                <label htmlFor="">Tên đăng nhập</label>
                                <input type="text" placeholder="Username / Email / Số điện thoại" />
                            </div>
                            <div className="login__container">
                                <label htmlFor="">Mật khẩu</label>
                                <input type={`${hiden ? "password" : "text"}`} placeholder="0123456" />
                                <div onClick={handleHiden}><i className={`${!hiden ? "fa-solid fa-eye" : "fa-solid fa-eye hiden"}`}></i><i className={`${hiden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye-slash hiden"}`}></i></div>
                            </div>
                            <div className="login__container__checkbox">
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <span>Ghi nhớ đăng nhập</span>
                                </div>
                                <label htmlFor="">Quên mật khẩu ?</label>
                            </div>
                            <button>Đăng nhập ngay</button>
                        </div>
                    </div> : <></>
                    }
                    {popupLogin === 2 ? <div className="register same">
                        <div className="login__left" style={{ background: "url('https://img.freepik.com/free-psd/presentation-back-front-smartwatches-with-screen-mock-up_23-2148787550.jpg?t=st=1653904478~exp=1653905078~hmac=d8c3f665f41ac9f899b82afa0b3156cfe414315df2c615c7040130167c175a87&w=1060') no-repeat center center / cover" }}>
                        </div>
                        <div className="login__right">
                            <div className="top">
                                <h2>Đăng ký</h2>
                                <div>
                                    <p>Bạn đã có tài khoản?</p>
                                    <p className="registerNow" onClick={() => { handlePopupLogin(1) }}>Đăng nhập ngay</p>
                                </div>
                            </div>
                            <div className="login__container" >
                                <label htmlFor="">Nhập họ và tên</label>
                                <input type="text" placeholder="Nguyễn Văn A" />
                            </div>
                            <div className="login__container" >
                                <label htmlFor="">Nhập tên đăng nhập</label>
                                <input type="text" placeholder="Username / Email / Số điện thoại" />
                            </div>
                            <div className="login__container">
                                <label htmlFor="">Nhập mật khẩu</label>
                                <input type={`${hiden ? "password" : "text"}`} placeholder="0123456" />
                                <div onClick={handleHiden}><i className={`${!hiden ? "fa-solid fa-eye" : "fa-solid fa-eye hiden"}`}></i><i className={`${hiden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye-slash hiden"}`}></i></div>
                            </div>
                            <div className="login__container">
                                <label htmlFor="">Nhập lại mật khẩu</label>
                                <input type={`${hiden ? "password" : "text"}`} placeholder="0123456" />
                                <div onClick={handleHiden}><i className={`${!hiden ? "fa-solid fa-eye" : "fa-solid fa-eye hiden"}`}></i><i className={`${hiden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye-slash hiden"}`}></i></div>
                            </div>
                            <div className="login__container" >
                                <label htmlFor="">Nhập email</label>
                                <input type="text" placeholder="info@bkwatch.vn" />
                            </div>
                            <div className="login__container__checkbox">
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <span>Tôi đã đọc và đồng ý điều khoản</span>
                                </div>
                            </div>
                            <button>Đăng ký ngay</button>
                        </div>
                    </div> : <></>
                    }
                </div>
            }
        </div>
    )
}
