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

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        color: '#fff',
    },
}));

export const Header = ({ isScroll }) => {
    const dispatch = useDispatch()

    const handleClickMenu = ()=>{
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
                            <li><PersonIcon></PersonIcon></li>
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
                <div className="bottom align-item___center">
                    <div className="bottom___left" onClick={handleClickMenu}>
                        <ul>
                            <li className="margin___right">Trang chủ</li>
                            <li className="margin___right">Sản phẩm</li>
                            <li className="margin___right">Liên hệ</li>
                            <li className="margin___right">Về chúng tôi</li>
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
            
        </div>
    )
}
