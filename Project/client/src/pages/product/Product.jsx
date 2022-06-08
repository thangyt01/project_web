import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";

import "./product.scss";

const Product = ({ selected }) => {
  // dataDemo
  const data = {
    id: 1,
    name: "Yêu thích Đồng hồ mặt vuông LED phổ biến kỹ thuật số cho học sinh",
    detail: [
      "Mặt đồng hồ Kỹ thuật số",
      "Đồng hồ đeo tay Khác",
      "Kiểu đồng hồ Thời i",
    ],
    descripion: [
      "Thời gian giao hàng dự kiến cho sản phẩm này là từ 7-9 ngày",
      "",
      "Chào mừng bạn bè của ch.",
      "",
      "~ Cảm ơn bạn đã đến và chúc bạn một cuộc sống hạnh phúc ~",
    ],
    price: "₫14.000",
    discount: 0,
    color: [
      "trắng",
      "Màu đỏ",
      "màu tím",
      "đen",
      "màu xanh da trời",
      "Hoa hồng đỏ",
    ],

    createdBy: 0,
    updatedBy: 0,
    deletedBy: 0,
    image_path: [
      "https://cf.shopee.vn/file/8759ee65a5fec78bdb9cf0a442c8c5be_tn",
      "https://cf.shopee.vn/file/137fe9249dd05352ee7cd96d41c961e2_tn",
      "https://cf.shopee.vn/file/1d44d8a242d4408cc511d6b6093c507e_tn",
      "https://cf.shopee.vn/file/2c964870e9686b6c8ced8798538b6a50_tn",
      "https://cf.shopee.vn/file/492f47a75235713830fd70ea861e00ab_tn",
    ],
  };
  //   data.detail.map((item) => (
  //     <span>item</span>
  //   ))
  return (
    <div className="productPage">
      <Header selected={selected}></Header>
      <div className="productContainer">
        <div className="productDetail">
          <div className="productImage">
            <div className="productBigImage">
              <img src={data.image_path[0]} alt="" />
            </div>
            <div className="productSmallImageList">
              <div className="productSmallImage">
                <img src={data.image_path[1]} alt="" />
              </div>
              <div className="productSmallImage">
                <img src={data.image_path[2]} alt="" />
              </div>
              <div className="productSmallImage">
                <img src={data.image_path[3]} alt="" />
              </div>
            </div>
          </div>
          <div className="productContent">
            <div className="content product--name">
              <b>{data.name}</b>
            </div>
            <div className=" content product--price">
              <span>{data.price}</span>
            </div>
            <div className="content">
              {data.detail.map((item, key) => (
                <div className="product--detail">{item}</div>
              ))}
            </div>
            <div className="content product--color">
              <select name="color" id="color">
                {data.color.map((item, key) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="product--button">
              <button type="button">Thêm vào giỏ hàng</button>
            </div>
          </div>
          <div className="productOther">
            <div className="productOtherDetail">hahaha</div>
            <div className="productOtherDetail">hahaha</div>
            <div className="productOtherDetail">hahaha</div>
          </div>
        </div>
        <div className="productDescription">
          {data.descripion.map((item, key) => (
            <div className="productDesciptionDetail">{item}</div>
          ))}
        </div>
        <div className="recommendProduct">
            <h2>Danh sách sản phẩm cùng loại</h2>
            <div className="recommendProductContainer">
                <div className="recommendProductDetail">
                    sp1
                </div>
                <div className="recommendProductDetail">
                    sp2
                </div>
                <div className="recommendProductDetail">
                    sp3
                </div>
                <div className="recommendProductDetail">
                    sp4
                </div>
                
            </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Product;
