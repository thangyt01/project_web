import './app.scss';
import Home from './pages/home/Home';
import User from './pages/user/User';



function App() {
  return (
    <div className="app" >
      {/* <Home selected={1}></Home>  */}
      <User selected={1}></User>
    </div>
  );
}

export default App;
