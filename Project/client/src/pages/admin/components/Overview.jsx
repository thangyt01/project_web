import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { privateRequest } from "../../../requestAxios"
import Element from "./Element"

function getDate(){
    
}

const Overview = () => {
    const { currentUser } = useSelector(state => state.user)
    const [stats, setStats] = useState
    useEffect(()=>{
        const getStats = async () => {
            try {
                await privateRequest.get('/api/order/stats', {
                    headers: {
                        authorization: JSON.stringify(currentUser.token)
                    }
                })
            } catch (error) {
                if(error.response.data.code === 200){
                    setStats(error.response.data.data)
                }
            }
        }
        getStats()
    })
    return (
        <div className='overview'>
            <div className="container">
                <h1>Thống kê tháng 7</h1>
                <div>
                    <Element title={'Doanh thu tháng này'} total={"40000 VNĐ"}/>
                    <Element title={'Doanh thu tháng trước'} total={"40000 VNĐ"}/>
                </div>
            </div>
        </div>
    )
}

export default Overview