import {useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import ChangePassword from "../../components/changePassword/ChangePassword"
import Footer from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import HistoryOrder from "../../components/historyOrder/HistoryOrder"
import Profiles from "../../components/profiles/Profiles"


import "./user.scss"

const User = ({selected}) => {
    const [isScroll, setIsScroll] = useState(false)
    const dispatch = useDispatch()

    

    return (
        <div className="user">
            <Header selected={selected}></Header>
            <Profiles></Profiles>
            {/* <HistoryOrder></HistoryOrder> */}
            {/* <ChangePassword></ChangePassword> */}
            <Footer></Footer>
        </div>
    )
}

export default User
