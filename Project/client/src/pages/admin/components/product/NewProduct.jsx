import React, { useRef, useState } from "react";
import Footer from "../../../../components/footer/Footer";
import { Header } from "../../../../components/header/Header";
import { privateRequest } from "../../../../requestAxios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./newProduct.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { PopupAnimation } from "../../../../components/PopupAnimation/PopupAnimation";

export const NewProduct = () => {
    const [check, setCheck] = useState(0)
    const {currentUser} = useSelector(state => state.user)
    const [product, setProduct] = useState({});
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState(0);
    const [productDiscount, setProductDiscount] = useState("");
    const [productDetail, setProductDetail] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productColor, setProductColor] = useState("");
    const [productImage, setProductImage] = useState([]);
    const [files, setFiles] = useState("");
    const [popup, setPopup] = useState(false)
    const handeUpdate = async (e) => {
        e.preventDefault();
        let dataProductUpdate = {
            name: productName,
            price: productPrice,
            color: productColor.split(", "),
            descripion:
                productDesc.split(". "),
            detail:
                productDetail.split(". "),
            discount: parseInt(productDiscount),
            image_path: [...productImage],
        };
        try {
            const res = await privateRequest.post(`api/product/create`, dataProductUpdate, {headers: {
                authorization: JSON.stringify(currentUser.token),
            }});
            console.log(res);
          } catch (err) {
            console.log(err);
        }
    };
       const handleRemoveImage = (item) => {
        var index = productImage.indexOf(item);
        if (index !== -1) {
            productImage.splice(index, 1);
        };
        setCheck(!check)
    }
    const inputRef = useRef()
    const handleAddImage = async (item)=>{
        const files = inputRef.current.files
        try {
            const list = await Promise.all(
                Object.values(files).map(async (file) => {
                    const data = new FormData();
                    data.append("file", file);
                    data.append("upload_preset", "upload");
                    const uploadRes = await axios.post(
                        "https://api.cloudinary.com/v1_1/trungkien2022001/image/upload",
                        data
                    );
                    const { url } = uploadRes.data;
                    productImage.push(url)
                    return url;
                })
            );
        setCheck(!check)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <Header />
            {popup && <PopupAnimation data={{header: "SUCCESS", body:"Thêm sản phẩm thành công"}}/>}
            <div className="container padding___main">
                <div className="left">
                    <div className="title__image">Danh sách hình ảnh</div>
                    <div className="imageContainer">
                        {productImage ? (
                            productImage.map((item, index) =>
                            (
                                <div className="imageItem">
                                    <img src={item} alt="" />
                                    <div onClick={() => handleRemoveImage(item)} className="xButton">X</div>
                                </div>
                            )
                            )
                        ) : (
                            <>Không có ảnh</>
                        )}
                        <div className="addImage">
                            <AddPhotoAlternateIcon />
                            <input
                                type="file"
                                id="file"
                                multiple
                                onChange={(e) => handleAddImage(e)}
                                ref = {inputRef}
                            />
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="rightContainer">
                        <div className="nameChange">
                            <div className="name title__change">Tên sản phẩm</div>
                            <div className="nameDetail">
                                <input
                                    onChange={(e) => setProductName(e.target.value)}
                                    className="textNameInput"
                                    type="text"
                                    placeholder="Tên"
                                />
                            </div>
                        </div>
                        <div className="part1">
                            <div className="nameChange">
                                <div className="price title__change">Giá</div>
                                <div className="priceDetail">
                                    <input
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        className="textPriceInput"
                                        type="text"
                                        placeholder="Giá"
                                    />
                                </div>
                            </div>
                            <div className="nameChange">
                                <div className="discount title__change">Giảm giá(%)</div>
                                <div className="discountDetail">
                                    <input
                                        onChange={(e) => setProductDiscount(e.target.value)}
                                        className="DiscountInput"
                                        type="number"
                                        placeholder="Giảm giá"
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>
                            <div className="nameChange">
                                <div className="color title__change">Màu sắc</div>
                                <div className="colorDetail">
                                    <input
                                        onChange={(e) => setProductColor(e.target.value)}
                                        className="textColorInput"
                                        type="text"
                                        placeholder="Màu sắc, các màu cách nhau bởi dấu (, )"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="nameChange">
                            <div className="DetailChange title__change">Chi tiết</div>
                            <div className="DetailDetail">
                                <textarea
                                    onChange={(e) => setProductDetail(e.target.value)}
                                    name=""
                                    id=""
                                    cols="98"
                                    rows="5"
                                    placeholder="Chi tiết sản phẩm"
                                ></textarea>
                            </div>
                        </div>
                        <div className="nameChange">
                            <div className="DescChange title__change">Mô tả</div>
                            <div className="DescDetail">
                                <textarea
                                    onChange={(e) => setProductDesc(e.target.value)}
                                    name=""
                                    id=""
                                    cols="98"
                                    rows="6"
                                    placeholder="Mô tả sản phẩm"
                                ></textarea>
                            </div>
                        </div>
                        <div className="updateBtn">
                            <button onClick={handeUpdate}>Thêm sản phẩm</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
