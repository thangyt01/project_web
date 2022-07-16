import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import Footer from "../../../../components/footer/Footer";
import { Header } from "../../../../components/header/Header";
import { privateRequest, publicRequest } from "../../../../requestAxios";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "./changeProduct.scss";
import axios from "axios";
import Notfound from "../../../../components/notfound/Notfound";
import { useSelector } from "react-redux";

export const ChangeProduct = () => {
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
    const [check, setCheck] = useState(0)
    const [imageDelete, setImageDelete] = useState([])
    let image_path_arr = []
    const location = useLocation();
    let index1 = location.pathname.split("/")[3];
    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await publicRequest.get(`api/product?id=${index1}`);
                setProduct(res.data);
            } catch (err) {
                setProduct(err.response.data.data);
                image_path_arr = err.response.data.data.image_path
            }
        };
        getProduct();
        window.scrollTo(0, 0);
    }, [index1]);
    const handeUpdate = async (e) => {
        e.preventDefault();
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
                    console.log(url)
                    productImage.push(url)
                    return url;
                })
            );
        } catch (err) {
            console.log(err);
        }
        let dataProductUpdate = {
            name: productName || product.name,
            price: productPrice || product.price,
            color: productColor.split(", ").join("@@@") || product.color.join("@@@"),
            descripion:
                productDesc.split(". ").join("\n") || product.descripion.join("\n"),
            detail:
                productDetail.split(". ").join("@@@") || product.detail.join("@@@"),
            discount: parseInt(productDiscount)||product.discount,
            image_path_add: [...productImage],
            image_path_remove: [...imageDelete],
        };
        let dataImageUpdate = [...productImage, ...product.image_path]
        try {
            const res = await privateRequest.put(`api/product/update?id=${index1}`, dataProductUpdate, {
                headers: {
                    authorization: JSON.stringify(currentUser.token) 
                }
            });
            console.log(res);
          } catch (err) {
            console.log(err);
        }
        Navigate('./')
        window.scrollTo(0, 0)
    };
  
    const handleRemoveImage = (item) => {
        var index = product.image_path.indexOf(item);
        if (index !== -1) {
            product.image_path.splice(index, 1);
        };
        imageDelete.push(item)
        setCheck(!check)
    }

    return (
        <div>
            <Header />
            {product ?
            <div className="container padding___main">
                <div className="left">
                    <div className="title__image">Danh sách hình ảnh</div>
                    <div className="imageContainer">
                        {product && product.image_path != undefined ? (
                            product.image_path.map((item, index) =>
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
                                onChange={(e) => setFiles(e.target.files)}
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
                                    defaultValue={product.name}
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
                                        defaultValue={product.price}
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
                                        defaultValue={product.discount}
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
                                        defaultValue={product.color ? product.color.join(", ") : ""}
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
                                    defaultValue={product.detail ? product.detail.join(". ") : ""}
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
                                    defaultValue={
                                        product.descripion ? product.descripion.join(". ") : ""
                                    }
                                ></textarea>
                            </div>
                        </div>
                        <div className="updateBtn">
                            <button onClick={handeUpdate}>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>:<Notfound title={"Không tìm thấy sản phẩm"}/>}
            <Footer />
        </div>
    );
};
