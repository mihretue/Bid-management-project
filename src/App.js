import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbarcomp from "./components/Navbarcomp";
import Footer from "./components/footer";
import Layout from "./pages/layout";
import Login from './pages/login'
import Signup from './pages/signup'

import Nopage from './pages/nopage'
function App() {
  return (
    
    <div >
      <BrowserRouter>
      {/* <Navbarcomp /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="adverts" element={<Login />} />
          <Route path="about" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />}/>
          <Route path="mailus" element={<Login />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  
  );
}

export default App;
