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


function App() {
  return (
    <div className="app" >
      <Router>
        <Routes>
          <Route path="/*" element={<Home selected={1}/>}/>
          <Route path="/product/:id" element={<Product selected={2}/>}/>
          <Route path="/products/*" element={<ProductsPage selected={2}/>}/>
          <Route path="/user/*" element={<User selected={2}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
