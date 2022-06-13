import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import Products from "../../components/products/Products";
import { orderSuccess } from "../../redux/orderRedux";
import AddTaskIcon from "@mui/icons-material/AddTask";
import "./productPage.scss";
import { publicRequest } from "../../requestAxios";
import axios from "axios";
import useFetch from "../../hooks/useFetch"

var timeId;
  const ProductPage = ({ selected }) => {
  // const [data, setData] = useState({})
  // const res =  publicRequest.get('/api/product?id=31')
  // const data = await axios.get('api/product?id=31');
  // console.log(data)
  const a = useFetch('api/product?id=31');
  console.log(a);

  const data = {
    id: 31,
    name: "Yêu thíchĐồng hồ đeo tay dây lưới bằng thép không gỉ siêu thanh mảnh sang trọng dành cho nam",
    detail: [
      "Mặt đồng hồ Kim",
      "Đồng hồ đeo tay Thạch anh",
      "Kiểu đồng hồ Thời trang",
      "Kiểu vỏ đồng hồ Tròn",
      "Chất liệu vỏ đồng hồ Thép không gỉ",
      "Kiểu khóa đồng hồ Cài khóa",
      "Chất liệu dây đeo Thép không gỉ",
      "Kính đồng hồ Kính Thủy tinh",
      "Xuất xứ Trung Quốc",
      "Kho hàng 37051",
      "Gửi từ Nước ngoài",
    ],
    descripion: [
      "Thời gian giao hàng dự kiến cho sản phẩm này là từ 7-9 ngày\n \n Lưu ý:",
      "✔Sản phẩm chất lượng cao với giá cả phải chăng.",
      "✔Tất cả sản phẩm đều là hàng có sẵn.",
      "✔Tất cả hình ảnh được chụp từ sản phẩm thực tế.",
      "✔Tất cả các sản phẩm đều có sẵn trong kho trừ khi được đánh dấu là đã bán hết.",
      "✔Vui lòng chọn màu sắc sản phẩm khi tiến hành đặt mua. Trong một số trường hợp, chúng tôi không thể hỗ trợ quý khách lựa chọn màu sắc như ý muốn. Nếu trong phần tùy chọn có: “Ngẫu nhiên” hoặc “Tất cả các loại,điều đó có nghĩa là chúng tôi sẽ tự quyết định màu sắc sản phẩm.",
      "✔Chúng tôi không hỗ trợ hủy bỏ đơn đặt hàng sau khi vận chuyển, vui lòng cân nhắc cẩn thận trước khi đặt mua.",
      '✔Hỗ trợ bán lẻ và bán sỉ. (Nếu có tùy chọn "bán sỉ")',
      "",
      "Cơ chế chuyển động: Thạch anh",
      "Chất liệu vỏ: Thép không gỉ",
      "Phong cách: Thời trang hàng ngày",
      "Số mã sản phẩm: YK198",
      "Chất liệu dây đeo: Thép không gỉ",
      "Chiều rộng dây đeo: 20mm",
      "Chiều dài dây đeo: 23cm",
      "Độ dày vỏ: 8mm",
      "Đường kính mặt số: 40mm",
      "Chất liệu hộp đựng: Không có hộp",
      "Chất liệu mặt kính: Thủy tinh",
      "Hình dạng vỏ: Tròn",
      "Không thấm nước: Không chống thấm nước",
      "Bảo hành: Không bảo hành",
      "Gói hàng bao gồm: 1 Đồng hồ đeo tay kèm pin",
    ],
    price: "₫42.000 - ₫49.700",
    discount: 0,
    color: [
      "steel rose gold",
      "steel black red",
      "steel silver",
      "leather black red",
      "Leather black white",
      "Leather black blue",
      "Leather rose gold",
      "steel black blue",
    ],
    createdAt: "2022-05-27T14:39:12.000Z",
    updatedAt: "2022-05-27T14:39:12.000Z",
    deletedAt: null,
    createdBy: 0,
    updatedBy: 0,
    deletedBy: 0,
    image_path: [
      "https://cf.shopee.vn/file/66a17555fc8f97758376d4bf9cf05392_tn",
      "https://cf.shopee.vn/file/8292b55c9d6f3c78036ba232435619d3_tn",
      "https://cf.shopee.vn/file/1d76023e570f2be739d09e85e7f9a378_tn",
      "https://cf.shopee.vn/file/8eeaf1d2284ff5c5ea7beae9b20e0688_tn",
      "https://cf.shopee.vn/file/f694f4c507eca654fc81cd9a701645b4_tn",
    ],
  };

  const [index, setIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  // useEffect(() => {
  //   timeId = setInterval(() => {
  //     setIndex(index + 1 < data.image_path.length ? index + 1 : 0);
  //   }, 3000);
  //   return () => clearInterval(timeId);
  // });
  const displayWidth =
    document.querySelector(".productBigImage")?.clientWidth || 320;
  useEffect(() => {
    setImageWidth(displayWidth);
  }, [displayWidth]);
  const handleClick = (index) => {
    setIndex(index);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(orderSuccess({ quantity: 1, price: 2 }));
  };

  return (
    <div className="productPage">
      <Header selected={selected}></Header>

      <div className="productContainer padding___main">
        <div className="productDetail">
          <div className="productImage">
            <div
              className="productBigImage"
              style={{ transform: `translateX(${-imageWidth * index}px)` }}
            >
              {data.image_path.map((item, index) => (
                <img src={item} alt="" />
              ))}
            </div>
            <div className="productSmallImageList">
              {data.image_path.map((item, index1) => (
                <div
                  className={
                    index === index1
                      ? "productSmallImage selected"
                      : "productSmallImage"
                  }
                >
                  <button
                    onClick={() => {
                      handleClick(index1);
                    }}
                  >
                    <img src={item} className="" alt="" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="productContent">
            <div className="content product--name">
              <b>{data.name}</b>
            </div>
            <div className=" content product--price">
              <i className="fa-solid fa-circle-dollar"></i>
              <span>{data.price}</span>
            </div>
            <div className="content">
              {data.detail.map((item, key) => (
                <div className="product--detail">
                  <AddTaskIcon />
                  {item}
                </div>
              ))}
            </div>
            <div className="content product--color">
              <span>
                {" "}
                <b>Màu sắc: </b>
              </span>
              <select name="color" id="color">
                {data.color.map((item, key) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="product--submit" onClick={handleSubmit}>
              <button type="button">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </div>
        <div className="productDescription">
          <div className="descTitle">
            <b></b>
            <h2>Thông tin thêm</h2>
            <b></b>
          </div>
          <div className="desc">
            {data.descripion.map((item, key) => (
              <div className="productDesciptionDetail">{item}</div>
            ))}
          </div>
        </div>
      </div>
      <Products title={"Sản phẩm mới nhất"} />
      <Footer></Footer>
    </div>
  );
};

export default ProductPage;
