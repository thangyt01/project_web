import "./header.scss"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
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
import { checkEmail, checkFullname, checkPassword, checkRePassword, checkUsername } from "../../helpers/validator";
import { login, logout, register } from "../../redux/apiCalls";

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
    const {currentUser} = useSelector(state => state.user)
    const {listOrder} = useSelector(state => state.order)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const refPopup = useRef()
    const [hiden, setHiden] = useState(true)
    const [keyword, setKeyword] = useState('')
    const [popupLogin, setPopupLogin] = useState(0)
    const [usernameLogin, setUsernameLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')
    const [isValidLogin, setIsValidLogin] = useState(1)
    const [userRegister, setUserRegister] = useState('')
    const [usernameRegister, setUsernameRegister] = useState('')
    const [passwordRegister, setPasswordRegister] = useState('')
    const [re_passwordRegister, setRe_passwordRegister] = useState('')
    const [emailRegister, setEmailRegister] = useState('')
    const [checkboxRegister, setCheckboxRegister] = useState(false)
    const [isValidRegister, setIsValidRegister] = useState(1)
    const {isFetching, isSuccess, error, isSuccessRe, errorRe, msgErr} = useSelector((state)=> state.user)
    const handleHiden = () => {  
        setHiden(!hiden)
    }

    useEffect(()=>{
        if(isSuccess){
            setTimeout(()=>{
                refPopup.current.style.display = 'none'
            }, 700)
        }else{
            if (document.querySelector('.fill')) document.querySelector('.fill').style.display = 'flex'
            setPopupLogin(0)
        }
    },[isSuccess])

    const handlePopupLogin = (value) => {        
        setPopupLogin(value)
    }

    const handleClickMenu = () => {
        const bottom___left = document.querySelector(".bottom___left")
        bottom___left.classList.toggle('add')
    }

    const handleChangeInput = (e)=>{
        setKeyword(e.target.value)
    }

    const handleLogin = ()=>{
        if(!checkUsername(usernameLogin) || !checkPassword(passwordLogin)){
            setIsValidLogin(0)
        }else{
            setIsValidLogin(1)
            login(dispatch, {username: usernameLogin, password: passwordLogin})
        }
    }

    const handleRegister = ()=>{
        if(!checkUsername(usernameRegister) || !checkPassword(passwordRegister) || !checkPassword(re_passwordRegister) 
            || !checkRePassword(passwordRegister, re_passwordRegister) || !checkFullname(userRegister) || !checkEmail(emailRegister) || !checkboxRegister){
            setIsValidRegister(0)
        }else{
            setIsValidRegister(1)
            let arr = userRegister.split(' ')
            let firstname = arr[arr.length - 1]
            let lastname = arr.slice(0, -1).join(' ')
            register(dispatch, {username: usernameRegister, password: passwordRegister, re_password: re_passwordRegister, firstname, lastname, email: emailRegister})
        }
    }
    
    const handleClickUser = ()=>{
        if(isSuccess){
            navigate('/user')
        }
        else{
            handlePopupLogin(1)
        }
    }

    const handleLogout = ()=>{
        logout(dispatch)
        navigate('/')
    }

    return (
        <div className={"header"}>
            <div className="wrapper">
                <div className="top padding___main">
                    <Link style={{textDecoration: 'none', flex: "1.5"}} to={"/"}>
                        <div className="top___left">Bk watch</div>
                    </Link>
                    <div className="top___center">Hello summer, sale lớn bất ngờ !!</div>
                    <div className="top___right">
                        <ul>
                            <li><PhoneIcon></PhoneIcon> <span className="hidden___tablet" style={{ marginLeft: '5px' }}>0906 03 5225</span></li>
                            <li className="userIcon">
                                <PersonIcon onClick={handleClickUser}></PersonIcon>
                                {isSuccess && 
                                    <div>
                                        {!currentUser.profile.isAdmin ? <></> :<p onClick={()=>{navigate('/admin')}}>Quản lý web</p>}
                                        <p onClick={handleLogout}>Logout</p>
                                    </div>
                                }
                            </li>
                            <Link style={{textDecoration: 'none', color: 'black'}} to={"/cart"}>
                                <li>
                                    <IconButton aria-label="cart">
                                        <StyledBadge badgeContent={listOrder.length}>
                                            <ShoppingCartIcon id='shoppingCart' />
                                        </StyledBadge>
                                    </IconButton>
                                </li>
                            </Link>
                        </ul>
                    </div>
                </div>
                <div className={`bottom align-item___center ${selected !== 1 ? "first":""}`}>
                    <div className="bottom___left" onClick={handleClickMenu}>
                        <ul>
                            <Link style={{textDecoration: 'none', color: 'black'}} to={"/"}>
                                <li className={`${selected === 1 ? "choose":""}`}>Trang chủ</li>
                            </Link>
                            <Link style={{textDecoration: 'none', color: 'black'}} to={"/products"}>
                                <li className={`${selected === 2 ? "choose":""}`}>Sản phẩm</li>
                            </Link>
                            <Link style={{textDecoration: 'none', color: 'black'}} to={"/contact"}>
                                <li className={`${selected === 3 ? "choose":""}`}>Liên hệ</li>
                            </Link>
                            <Link style={{textDecoration: 'none', color: 'black'}} to={"/about-me"}>
                                <li className={`${selected === 4 ? "choose":""}`}>Về chúng tôi</li>
                            </Link>
                        </ul>
                        <IconButton aria-label="menu" className="padding__side">
                            <MenuIcon className="menuIcon"></MenuIcon>
                        </IconButton>
                    </div>
                    <div className="bottom___right">
                        <div className="searchContainer align-item___center">
                            <input type="text" className="searchInput" onKeyPress ={(e)=>{if(e.key === 'Enter') navigate('/search?keyword='+keyword)}} onChange={(e)=>handleChangeInput(e)} />
                            <Link to={'/search?keyword='+keyword}>
                                <IconButton aria-label="search" className="padding__side">
                                    <SearchIcon></SearchIcon>
                                </IconButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {!popupLogin? <></> : 
                <div className="fill" ref={refPopup} >
                    <div className="fill2" onClick={()=>{ handlePopupLogin(0) }}></div>
                    <div className="exit" onClick={() => { handlePopupLogin(0) }}>
                        <IconButton aria-label="exit">
                            <CloseIcon></CloseIcon>
                        </IconButton>
                    </div>
                    {popupLogin === 1? <div className="login same">
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
                                <input onKeyDown={e => {if(e.key === 'Enter') handleLogin()}} onChange={(e)=>setUsernameLogin(e.target.value)} type="text" placeholder="Username / Email / Số điện thoại" />
                            </div>
                            <div className="login__container">
                                <label htmlFor="">Mật khẩu</label>
                                <input onKeyDown={e => {if(e.key === 'Enter') handleLogin()}} onChange={(e)=>setPasswordLogin(e.target.value)} type={`${hiden ? "password" : "text"}`} placeholder="0123456" />
                                <div onClick={handleHiden}><i className={`${!hiden ? "fa-solid fa-eye" : "fa-solid fa-eye hiden"}`}></i><i className={`${hiden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye-slash hiden"}`}></i></div>
                            </div>
                            <div className="login__container__checkbox">
                                <div>
                                    <input type="checkbox" name="" id="" />
                                    <span>Ghi nhớ đăng nhập</span>
                                </div>
                                <label htmlFor="">Quên mật khẩu ?</label>
                            </div>
                            {isValidLogin ? <></> : <p className="isValid">Thông tin không hợp lệ</p>}
                            {!error ? <></> : <p className="isValid">Sai tên đăng nhập hoặc mật khẩu</p>}
                            {!isSuccess ? <></> : <p className="isSuccess">Đăng nhập thành công</p>}
                            <button onClick={handleLogin} disabled={isFetching}>Đăng nhập ngay</button>
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
                                <input onChange={(e)=>setUserRegister(e.target.value)} type="text" placeholder="Nguyễn Văn A" />
                            </div>
                            <div className="login__container" >
                                <label htmlFor="">Nhập tên đăng nhập</label>
                                <input onChange={(e)=>setUsernameRegister(e.target.value)} type="text" placeholder="Username / Email / Số điện thoại" />
                            </div>
                            <div className="login__container">
                                <label htmlFor="">Nhập mật khẩu</label>
                                <input onChange={(e)=>setPasswordRegister(e.target.value)} type={`${hiden ? "password" : "text"}`} placeholder="0123456" />
                                <div onClick={handleHiden}><i className={`${!hiden ? "fa-solid fa-eye" : "fa-solid fa-eye hiden"}`}></i><i className={`${hiden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye-slash hiden"}`}></i></div>
                            </div>
                            <div className="login__container">
                                <label htmlFor="">Nhập lại mật khẩu</label>
                                <input onChange={(e)=>setRe_passwordRegister(e.target.value)} type={`${hiden ? "password" : "text"}`} placeholder="0123456" />
                                <div onClick={handleHiden}><i className={`${!hiden ? "fa-solid fa-eye" : "fa-solid fa-eye hiden"}`}></i><i className={`${hiden ? "fa-solid fa-eye-slash" : "fa-solid fa-eye-slash hiden"}`}></i></div>
                            </div>
                            <div className="login__container" >
                                <label htmlFor="">Nhập email</label>
                                <input onChange={(e)=>setEmailRegister(e.target.value)} type="text" placeholder="info@bkwatch.vn" />
                            </div>
                            <div className="login__container__checkbox">
                                <div>
                                    <input onChange={(e)=>setCheckboxRegister(e.target.value)} type="checkbox" name="" id="" />
                                    <span>Tôi đã đọc và đồng ý điều khoản</span>
                                </div>
                            </div>
                            {isValidRegister ? <></> : <p className="isValid">Thông tin không hợp lệ</p>}
                            {!errorRe ? <></> : <p className="isValid">{msgErr}</p>}
                            {!isSuccessRe ? <></> : <p className="isSuccess">Đăng ký tài khoản thành công</p>}
                            <button onClick={handleRegister} disabled={isFetching}>Đăng ký ngay</button>
                        </div>
                    </div> : <></>
                    }
                </div>
            }
        </div>
    )
}
