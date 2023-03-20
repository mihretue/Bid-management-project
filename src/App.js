import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarcomp from "./components/Navbarcomp";


function App() {
  return (
    
    <div >
      <BrowserRouter>
      <Navbarcomp />
      <Routes>
        <Route path="/" element= {<Home />}/>
      </Routes>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
