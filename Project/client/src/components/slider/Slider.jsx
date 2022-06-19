import './slider.scss'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
var timeId;

const Slider = () => {
    const [index, setIndex] = useState(0) 
    const handleClick = (type)=>{
        if(type === 'left'){
            setIndex(index - 1 >= 0 ? index - 1 : 5)
        }else{
            setIndex(index + 1 <=5 ? index + 1 : 0)
        }
    }
    useEffect(() => {
        timeId = setInterval(()=>{
            setIndex(index + 1 <=5 ? index + 1 : 0)
        }, 4000)
        return () => clearInterval(timeId)
    })

    const handleMouseMove = () => {
        clearInterval(timeId);
    }

    const handleMouseLeave = ()=>{
        timeId = setInterval(()=>{
            setIndex(index + 1 <=5 ? index + 1 : 0)
        }, 4000)
    }
    return (
        <div className='slider padding___main'>
            <div className="wrapper">
                <div className="top">
                    <h2 className="left">Bộ sưu tập</h2>
                    <Link style={{textDecoration: 'none', color: "#ccc"}} to={"/products"}>
                        <div className="right">Xem tất cả bộ sưu tập <ArrowRightIcon></ArrowRightIcon></div>
                    </Link>
                </div>
                <div className="bottom">
                    <div className="bottom__left" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <div className="btn_left" onClick={()=>{handleClick('left')}}>
                            <IconButton aria-label="left">
                                <ChevronLeftIcon></ChevronLeftIcon>
                            </IconButton>
                        </div>
                        <div className="btn_right">
                            <IconButton aria-label="right" onClick={()=>{handleClick('right')}}>
                                <ChevronRightIcon></ChevronRightIcon>
                            </IconButton>
                        </div>
                        <Link style={{textDecoration: 'none', color: "#ccc"}} to={"/products"}>
                            <div className="sliders" style={{transform: `translateX(${-800 * index}px)`}}>
                                <img className='slide-item' src="https://cdn.tgdd.vn/2022/05/banner/800-200-800x200-125.png" alt="" />
                                <img className='slide-item' src="https://cdn.tgdd.vn/2022/05/banner/800-200-800x200-187.png" alt="" />
                                <img className='slide-item' src="https://cdn.tgdd.vn/2022/05/banner/citizen-800-200-800x200.png" alt="" />
                                <img className='slide-item' src="https://cdn.tgdd.vn/2022/05/banner/elio-800-200-800x200.png" alt="" />
                                <img className='slide-item' src="https://cdn.tgdd.vn/2022/05/banner/fosilelle-800-200-800x200.png" alt="" />
                                <img className='slide-item' src="https://cdn.tgdd.vn/2022/05/banner/mvw-800-200-800x200.png" alt="" />
                            </div>
                        </Link>
                        
                    </div>
                    <div className="bottom__right">
                        <Link style={{textDecoration: 'none', color: "#ccc"}} to={"/products"}>
                            <div className="right__top">
                                <img src="https://cdn.tgdd.vn/2022/01/banner/sticky-dhtt1-390x97.png" alt="" />
                            </div>
                        </Link>
                        <Link style={{textDecoration: 'none', color: "#ccc"}} to={"/products"}>
                            <div className="right__bottom">
                                <img src="https://cdn.tgdd.vn/2022/01/banner/sticky-dhtt2-390x97.png" alt="" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slider