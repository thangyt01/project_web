import {useEffect } from "react"
import { useNavigate } from "react-router"
import ChangePassword from "../../components/changePassword/ChangePassword"
import Footer from "../../components/footer/Footer"
import { Header } from "../../components/header/Header"
import HistoryOrder from "../../components/historyOrder/HistoryOrder"
import Profiles from "../../components/profiles/Profiles"
import { checkCurrentUser } from "../../helpers/utils"


import "./user.scss"

const User = ({selected, type=1}) => {
    const navigate = useNavigate()
    useEffect(()=>{
        if (!checkCurrentUser(localStorage.getItem("persist:root"))) navigate('/')
    }, [])
    

    return (
        <div className="user">
            <Header selected={selected}></Header>
            {
                type === 1 ?
                <Profiles></Profiles>:<></>
            }

            {
                type === 2 ?
                <HistoryOrder></HistoryOrder>:<></>
            }

            {
                type === 3 ?
                <ChangePassword></ChangePassword>:<></>
            }            

            <Footer></Footer>
        </div>
    )
}

export default User
