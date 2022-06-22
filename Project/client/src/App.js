import './app.scss';
import Home from './pages/home/Home';
import Product from './pages/product/ProductPage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import ProductsPage from './pages/products/ProductsPage';
import User from './pages/user/User';
import SearchProduct from './pages/searchProduct/SearchProduct';


function App() {
  return (
    <div className="app" >
      <Router>
        <Routes>
          <Route path="/*" element={<Home selected={1}/>}/>
          <Route path="/product/:id" element={<Product selected={2}/>}/>
          <Route path="/products/*" element={<ProductsPage selected={2}/>}/>
          <Route path="/search/*" element={<SearchProduct selected={2}/>}/>
          <Route path="/user/*" element={<User selected={2} type={1}/>}/>
          <Route exact path="/user/history-order" element={<User selected={2} type={2}/>}/>
          <Route exact path="/user/change-password" element={<User selected={2} type={3}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
