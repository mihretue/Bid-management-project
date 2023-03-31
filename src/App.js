import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/footer";
import Layout from "./pages/layout";
import Login from './pages/login';
import SignUp from './pages/signup';
import About from "./pages/About";
import Adverts from "./pages/adverts";
import Nopage from './pages/nopage';
import {TbArrowBigUpLineFilled} from 'react-icons/tb'

function App() {
 
  return (
    
    <div>
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="adverts" element={<Adverts />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />}/>
          <Route path="mailus" element={<Login />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
      <Footer />
      <div title="Go to the top of the page" style={{width:'4rem',height:'4rem',backgroundColor:'darkred',position:'fixed',bottom:'1.5rem',right:'1rem',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'0.5rem'}}><a href="#top"><TbArrowBigUpLineFilled style={{width:'2rem',color:'white',height:'2rem'}}  /></a></div>
      </BrowserRouter>
    </div>
  
  );
}

export default App;
