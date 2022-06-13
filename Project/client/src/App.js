import './app.scss';
import ProductPage from './pages/product/ProductPage';
import Home from './pages/home/Home';



function App() {
  return (
    <div className="app" >
      <ProductPage selected={2}></ProductPage> 
      {/* <Home selected={1}></Home> */}
    </div>
  );
}

export default App;
