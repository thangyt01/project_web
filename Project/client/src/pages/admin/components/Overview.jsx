import Element from "./Element"

const Overview = () => {
    return (
        <div className='overview'>
            <div className="container">
                <h1>Thống kê tháng 7</h1>
                <div>
                    <Element title={'Người dùng'} up={1} current={130}/>
                    <Element title={'Sản phẩm'}/>
                    <Element title={'Đơn hàng'}/>
                    <Element title={'Doanh thu tháng này'} total={"40000 VNĐ"}/>
                </div>
            </div>
        </div>
    )
}

export default Overview