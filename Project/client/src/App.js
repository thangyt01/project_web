import './app.scss';
import Home from './pages/home/Home';



function App() {
  return (
    <div className="app" >
      <Home selected={1}></Home> 
    </div>
  );
}

export default App;
