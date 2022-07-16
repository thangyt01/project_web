import './app.scss';
import Home from './pages/home/Home';
import Product from './pages/product/ProductPage';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import ProductsPage from './pages/products/ProductsPage';
import User from './pages/user/User';
import SearchProduct from './pages/searchProduct/SearchProduct';
import Page404 from './pages/404/Page404';
import Admin from './pages/admin/Admin';
<<<<<<< HEAD
import { ChangeProduct } from './pages/admin/components/product/ChangeProduct';
import { NewProduct } from './pages/admin/components/product/NewProduct';
=======
import Contact from './pages/contact/Contact';
import AboutUs from './pages/about-us/AboutUs';
import { Cart } from './pages/cart/Cart';
>>>>>>> be796670dd2cdef0eb14b7aab27b45933b756c95


function App() {
  return (
    <div className="app" >
      <Router>
        <Routes>
          <Route path="/" element={<Home selected={1}/>}/>
          <Route path="/product/:id" element={<Product selected={2}/>}/>
          <Route path="/products/*" element={<ProductsPage selected={2}/>}/>
          <Route path="/search/*" element={<SearchProduct selected={2}/>}/>
          <Route path="/contact/*" element={<Contact selected={3}/>}/>
          <Route path="/about-us/*" element={<AboutUs selected={4}/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/*" element={<Page404/>}/>
          <Route path="/user/*" element={<User selected={2} type={1}/>}/>
          <Route exact path="/user/history-order" element={<User selected={2} type={2}/>}/>
          <Route exact path="/user/change-password" element={<User selected={2} type={3}/>}/>
          <Route path="/admin/productChange/:id" element={<ChangeProduct/>}/>
          <Route path="/admin/newproduct" element={<NewProduct/>}/>
          <Route path="/admin" element={<Admin selected={2} type={3} choose={2}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
