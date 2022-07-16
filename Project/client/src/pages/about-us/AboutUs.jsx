import Footer from '../../components/footer/Footer'
import { Header } from '../../components/header/Header'
import './aboutUs.scss'

const AboutUs = ({selected}) => {
    return (
        <div className='about-us'>
            <Header selected={selected}/>
            <div className="container1">
                <div className="header__contact padding___main">
                    <div>
                        <h2>Về chúng tôi</h2> 
                        <p>Trang chủ /<b>Về chúng tôi</b></p>
                    </div>
                </div>
                <div className="content padding___main">
                    <div>
                        <h1>
                            BK WATCH Cùng Chuyển Động Câu Chuyện Thời Gian
                        </h1>
                        <p>- Trong nhịp sống hiện đại, những chiếc đồng hồ đeo tay đã trở thành một phụ kiện “vật bất ly thân” của nhiều người. Đó không chỉ là một công cụ đong đếm thời gian thông dụng mà đã vượt lên khẳng  định sức hút riêng ở tầm ảnh hưởng của một phụ kiện, phong cách, sức hút và đẳng cấp của người sử dụng.</p>
                        <p>- Từ sự thấu hiểu, tầm nhìn cũng như mong muốn góp phần nối nhịp thời gian cùng những tín đồ đồng hồ BK WATCH mong muốn phục vụ, đáp ứng nhu cầu sử dụng đồng hồ đeo tay của tín đồ thời gian.</p>
                        <h2>1. Lịch sử thành lập BK WATCH</h2>
                        <p>- BK WATCH có tiền thân là Cửa hàng đồng hồ được thành lập vào năm 2019 tại số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội.</p>
                        <p>- Như vậy, BK WATCH đã có trên 3 năm kinh nghiệm trong lĩnh vực kinh doanh đồng hồ, xứng tầm một thương hiệu lớn đồng hành cùng vẻ đẹp bất tận của thời gian thông  qua những chiếc đồng hồ.</p>
                        <h2>2. Vị trí thuận lợi của BK WATCH</h2>
                        <p>- BK WATCH tọa lạc tại vị  trí số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội. Có thể nói, BK WATCH may mắn sở hữu một ví trí thuận lợi, nếu không nói là “đắc địa” tại đường Đại Cồ Việt, Giải Phóng chính là con đường quá quen thuộc của sinh viên Bách Khoa.</p>
                        <p>- Từ vị trí thuận tiện, sầm uất và vốn đã thu hút được những tín đồ mua sắm, BK WATCH rất thuận tiện phục vụ khách hàng của mình. Đây được xem là một điểm cộng trong sự phát triển lâu dàu của BK WATCH – điểm đến của những chiếc đồng hồ ấn tượng thu hút giữa lòng thành phố.</p>
                        <h2>3. Sứ mệnh của BK WATCH</h2>
                        <p>- Với sứ mệnh kết nối những “đại sứ thời gian” đến với những bàn tay người tiêu dùng BK WATCH mong muốn mang đến những sản phẩm, chất lượng dịch vụ, bảo hành hậu mãi tốt nhất. Từ đó mang đến sự kết nối và lan tỏa giữa khách hàng cùng BK WATCH trong hành trình phía trước.</p>
                        <p>- Từ những sản phẩm chất lượng với giá cạnh tranh, đi kèm giá thành cạnh tranh, ưu đãi, chế độ bảo hành, hậu mãi tốt nhất chính là những điểm cộng đặc biệt dành cho những khách hàng của mình. Bên cạnh đó, BK WATCH còn sở hữu đội ngũ nhân viên chuyên nghiệp, được đào tạo bài bản, cam kết mang đến cho khách hàng những trải nghiệm tuyệt vời nhất cùng thế giới thời gian.</p>
                        <p>- Tất cả những điều này đã cùng cộng hưởng và đồng nhất mang đến những giá trị đặc biệt đậm đà sức hút cho sứ mệnh của BK WATCH. Sản phẩm chất lượng, giá thành cạnh tranh, nâng tầm dịch vụ hướng mình đến sức hút mới.</p>
                        <h2>4. Tầm nhìn</h2>
                        <p>- BK WATCH là chuỗi bán lẻ đồng hồ thân thiện nhất, uy tín nhất và đạt lợi nhuận tốt nhất tại Việt Nam. Đó chính là hướng đi mang tầm chiến lược mà BK WATCH sẽ thực hiện cũng như khai phá những giá trị mới trong hành trình  chinh phục khách hàng của mình.</p>
                        <p>- Trong nhịp sống hiện đại thì những chiếc đồng hồ đeo tay luôn là một niềm cảm hứng chinh phục của bất kỳ ai. Chính vì thế BK WATCH định hướng mình phát triển, nối nhịp với sứ mệnh để mang đến những giá trị bền vững nhất dành cho những khách hàng của mình.</p>
                        <h2>5. Giá trị cốt lõi của BK WATCH</h2>
                        <p>- BK WATCH gói gọn trong 6 giá trị cốt lõi: Uy tín, Chất lượng, Chuyên nghiệp, Trung thực, Thân thiện, Tự hào, Sáng tạo.</p>
                        <p>- Những giá trị cơ bản từ BK WATCH chính là nơi lan tỏa những thông điệp ý nghĩa  đến toàn thể nhân viên và từ đó mang đến khách hàng, xây dựng đồng hành cùng nhau trong quá trình phát triển của thương hiệu.</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AboutUs