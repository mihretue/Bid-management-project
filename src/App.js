import {BrowserRouter, Routes, Route,useParams} from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/footer";
import Userpage from "./pages/user pages/userpage";
import WaitForApproval from "./pages/action pages/waitforapproval";
import {TbArrowBigUpLineFilled} from 'react-icons/tb'
import Biddocument from "./pages/action pages/biddocument";
import Payment from "./pages/action pages/payment";
import Download from "./pages/action pages/download";
//Pages
import Login from './pages/login';
import SignUp from './pages/signup';
import About from "./pages/About";
import Tenders from "./pages/tenders";
import Nopage from './pages/nopage';
import Tender from "./pages/tender";
//User Pages
import AdminPage from "./pages/user pages/adminPage";
import PheadPage from "./pages/user pages/pheadPage";
import PendchPage from "./pages/user pages/pendchPage";
import SupplierPage from "./pages/user pages/supplierPage";
//Layouts
import Layout from "./pages/layouts/layout";
import AdminLayout from "./pages/layouts/adminLayout";
import PheadLayout from "./pages/layouts/pheadLayout";
import PendchLayout from "./pages/layouts/pendchLayout";
import SupplierLayout from "./pages/layouts/supplierLayout";
//action pags
import ManageUserAccount from "./pages/user action pages/admin/manageuseraccount";
import ManageUser from "./pages/user action pages/admin/manageuser";
import BidComplaints from './pages/user action pages/bidder/bidcomplaints'
import BidsInProgress from './pages/user action pages/bidder/bidsinprogress'
import CancelledBids from './pages/user action pages/bidder/cancelledbids'
import ClarifyRequests from './pages/user action pages/bidder/clarifyrequests'
function App() {
  return (
    
    <div>
      <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tenders" element={<Tenders />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />}/>
          <Route path="mailus" element={<Login />} />
          <Route path="tenders/:id/apply/payment/:id" element={<Payment />} />
          {/* <Route path="payment" element={<Payment />} /> */}
          <Route path="tenders/:id/apply/biddocument/:id" element={<Biddocument/>} />
          <Route path='download' element={<Download/>}/>
          <Route path="waitforapproval" element={<WaitForApproval />} />
          <Route path="tenders/:id" element={<Tender />} />
          <Route path="*" element={<Nopage />} />
          {/* <Route path="userpage" element={<Userpage/>}></Route>
          <Route path="manageuseraccount" element={<ManageUserAcc />} /> */}
        </Route>
        <Route path="/userpage/admin/:id" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="/userpage/admin/:id/manage-accounts" element={<ManageUserAccount />} />
          <Route path="/userpage/admin/:id/manage-accounts/manage-user/:uid" element={<ManageUser />} />
        </Route>
        <Route path="/userpage/supplier/:id" element={<SupplierLayout />}>
          <Route index element={<SupplierPage />} />
          <Route path="/userpage/supplier/:id/bid-complaints" element={<BidComplaints />} />
          <Route path="/userpage/supplier/:id/bids-in-progress" element={<BidsInProgress />} />
          <Route path="/userpage/supplier/:id/cancelled-bids" element={<CancelledBids />} />
          <Route path="/userpage/supplier/:id/clarification-requests" element={<ClarifyRequests />} />
        </Route>
        <Route path="/userpage/phead/:id" element={<PheadLayout />}>
          <Route index element={<PheadPage />} />
        </Route>
        <Route path="/userpage/pendch/:id" element={<PendchLayout />}>
          <Route index element={<PendchPage />} />
        </Route>
      </Routes>
      <Footer />
      <div title="Go to the top of the page" style={{width:'4rem',height:'4rem',backgroundColor:'dark',position:'fixed',bottom:'1.5rem',right:'1rem',display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'0.5rem'}}><a href="#top"><TbArrowBigUpLineFilled style={{width:'2rem',color:'white',height:'2rem'}}  /></a></div>
      </BrowserRouter>
      </div>
      
      
      
      
    </div>
    
  
  );
}

export default App;
