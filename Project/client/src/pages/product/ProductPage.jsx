import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import Products from "../../components/products/Products";
import { orderSuccess } from "../../redux/orderRedux";
import "./productPage.scss";
import { publicRequest } from "../../requestAxios";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CheckIcon from '@mui/icons-material/Check';
import Notfound from "../../components/notfound/Notfound";
import { Link } from "react-router-dom";

const ProductPage = ({ selected }) => {
  const [product, setProduct] = useState({});
  const [detail, setDetail] = useState({quantity: 1});
  useEffect(() => {
    const arr = window.location.href.split("/")
    const index = arr.findIndex(i=>i === 'product')
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`api/product?id=${arr[index+1]}`);
        setProduct(res.data);
      } catch (err) {
        setProduct(err.response.data.data);
      }
    };
    getProduct();
  }, []);
  const [index, setIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
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
    dispatch(orderSuccess({
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      image: product.image_path[0],
      color: product.color[0],
      ...detail,
    }));
  };

 
  return (
    <div className="productPage">
      <Header selected={selected}></Header>
      {product && Object.keys(product).length > 0 ? (
        <div className="productContainer padding___main">
          <div className="heading">
            <div className="heading__root">
              <Link style={{color: "blue", textDecoration: "none"}} to="/">BK WATCH</Link>

            </div>
            <ChevronRightIcon ></ChevronRightIcon>
            <div className="heading__parent">
            <Link style={{color: "blue", textDecoration: "none"}}  to="/products">Đồng hồ</Link>
            </div>
            <ChevronRightIcon></ChevronRightIcon>
            <div className="heading__children">
              {product.name}
            </div>
          </div>
          <div className="productDetail">
            <div className="productImage">
              <div
                className="productBigImage"
                style={{ transform: `translateX(${-imageWidth * index}px)` }}
              >
                {product.image_path.map((item, index) => (
                  <img src={item} alt="" />
                ))}
              </div>
              <div className="productSmallImageList">
                {product.image_path.map((item, index1) => (
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
                <b>{product.name}</b>
              </div>
              <div className=" content product--price">
                <LocalOfferIcon/>
                <span style={{paddingLeft: "10px",fontSize: "25px", color: "#ff6363"}}>{product.price}đ</span>
              </div>
              <div className="content">
                {product.detail.map((item, key) => (
                  <div className="product--detail">
                    <CheckIcon/>
                    {item}
                  </div>
                ))}
              </div>
              <div className="content product--color">
                <span>
                  <b>Màu sắc: </b>
                </span>
                <select name="color" id="color" onChange={(e)=>{setDetail({...detail, color: e.target.value})}}>
                  {product.color.map((item, key) => (
                    <option value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="product--quantity">
                <span>
                  <b>Số lượng: </b>
                </span>
                  <input type="number" onChange={(e)=>{setDetail({...detail, quantity: parseInt(e.target.value)})}} id="quantity" defaultValue={1} name="quantity" min="1" max="10"></input>
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
              {product.descripion.map((item, key) => (
                <div className="productDesciptionDetail">{item}</div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Notfound title = "Sản phẩm này không tồn tại"></Notfound>
      )}

      <Products title={'Sản phẩm của chúng tôi'} type={'1'} limit={4} />
      <Footer></Footer>
    </div>
  );
};

export default ProductPage;
