import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import Products from "../../components/products/Products"
import Slider from "../../components/slider/Slider"

import "./home.scss"

const Home = ({selected}) => {
    const [isScroll, setIsScroll] = useState(false)
    const dispatch = useDispatch()

    

    return (
        <div className="home">
            <Header selected={selected}></Header>
            <Slider></Slider>
            <Products title={'Sản phẩm mới nhất'} type={'new'} limit={4}></Products>
            <Products title={'Sản phẩm bán chạy nhất'} type={'most'} limit={4}></Products>
            <Products title={'Sản phẩm của chúng tôi'} type={'new'} limit={4}></Products>
            <Footer></Footer>
        </div>
    )
}

export default Home
