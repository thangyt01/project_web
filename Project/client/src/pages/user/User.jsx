import {useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Footer from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import Profiles from "../../components/profiles/Profiles"


import "./user.scss"

const User = ({selected}) => {
    const [isScroll, setIsScroll] = useState(false)
    const dispatch = useDispatch()

    

    return (
        <div className="user">
            <Header selected={selected}></Header>
            <Profiles></Profiles>
            <Footer></Footer>
        </div>
    )
}

export default User
