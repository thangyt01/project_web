import "./footer.scss"
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <div className="footer">
            <div className="wrapper padding___main">
                <div className="col">
                    <Link style={{textDecoration: 'none', color: "#ccc"}} to={"/"}>
                        <h1 className="logo">BK WATCH</h1>
                    </Link>
                    <p>BK WATCH – Kênh mua sắm đồng hồ cao cấp</p>
                    <p>Địa chỉ: Số 1, Đại Cồ Việt, Hai Bà Trưng, Hà Nội.</p>
                    <b>Hotline: 0906052125</b>
                    <b>CSKH: 0906052125</b>
                    <p>Copyright © 2022 BK WATCH</p>
                </div>
                <div className="col">
                    <div>
                        <PhoneIcon fontSize="large"></PhoneIcon>
                        <p>0906 035225</p>
                    </div>
                    <p>(8:00 – 19:00, từ thứ hai đến chủ nhật)</p>
                    <h2>HỖ TRỢ KHÁCH HÀNG</h2>
                    <h3>Câu hỏi thường gặp (FAQ)</h3>
                    <h3>Hướng dẫn mua hàng</h3>
                    <h3>Chính sách giao hàng</h3>
                    <h3>Chính sách đổi trả</h3>
                    <h3>Chính sách bảo hành</h3>
                    <h3>Điều khoản bảo mật</h3>
                </div>
                <div className="col">
                    <div>
                        <EmailIcon fontSize="large"></EmailIcon>
                        <p>Email: info@bkwatch.vn</p>
                    </div>
                    <p>(Phản hồi trong thời gian sớm nhất)</p>
                    <h2>VỀ BK WATCH</h2>
                    <h3>Câu hỏi thường gặp (FAQ)</h3>
                    <h3>Quy trình tư vấn</h3>
                    <h3>Sản phẩm ở BK WATCH</h3>
                    <h3>Vì sao chọn BK WATCH?</h3>
                    <h3>Tuyển dụng</h3>
                </div>
                <div className="col">
                    <div>
                        <FacebookIcon fontSize="large" color="blue"></FacebookIcon>
                        <YouTubeIcon fontSize="large"></YouTubeIcon>
                        <LinkedInIcon fontSize="large"></LinkedInIcon>
                    </div>
                    <p>Được chứng nhận</p>
                    <img src="https://blog.webico.vn/wp-content/uploads/2019/12/GoDaddy-new-Logo.png" alt="" />
                    <p>Cách thức thanh toán</p>
                    <div className="imgs">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
