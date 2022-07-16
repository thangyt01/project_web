import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { privateRequest } from "../../../requestAxios"
import Element from "./Element"
import moment from "moment"

function getDate(){
    let m = moment().month() + 1
    let y = moment().year()
    m = m < 10 ? '0' + m : m
    return `${y}-${m}-01`
}

function getUp(now, last){
    try {
        if(!last) return 1
        if(now >= last) return 1
        return 0
    } catch (error) {
        return 0
    }
}

const Overview = () => {
    const { currentUser } = useSelector(state => state.user)
    const [stats, setStats] = useState()
    getDate()
    useEffect(()=>{
        const getStats = async () => {
            try {
                await privateRequest.get(`/api/order/stats?fromDay=${getDate()}&toDay=${moment().format('YYYY-MM-DD')}`, {
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
    }, [])
    return (
        <div className='overview'>
            <div className="container1">
                <h1>Thống kê tháng {new Date().getMonth() + 1} /{new Date().getFullYear()}</h1>
                <div>
                    <Element title={'Doanh thu tháng này'} total={`${stats && stats[0] && stats[0].total_cost || 0 } VNĐ`} up={stats && getUp(stats[0]?.total_cost, stats[1]?.total_cost)}/>
                    <Element title={'Số sản phẩm bán được'} total={stats && stats[0] && stats[0].quantity || 0} up={stats && getUp(stats[0]?.quantity, stats[1]?.quantity)}/>
                </div>
            </div>
        </div>
    )
}

export default Overview