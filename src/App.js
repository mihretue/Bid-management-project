import {BrowserRouter, Routes, Route,useParams} from "react-router-dom";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/footer";
import Userpage from "./pages/user pages/userpage";
import WaitForApproval from "./pages/action pages/waitforapproval";
import {TbArrowBigUpLineFilled} from 'react-icons/tb'
import Biddocument from "./pages/action pages/biddocument";
import Payment from "./pages/action pages/payment";
import ApplicationSuccess from "./pages/action pages/applSuccess";
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
import ApprovalRequests from './pages/user action pages/admin/approvalrequests'
import BannedAccounts from './pages/user action pages/admin/bannedaccounts'
import ManageBannedAccount from "./pages/user action pages/admin/managebannedaccount";
import ManageApproval from "./pages/user action pages/admin/manageapproval";
import ManageActiveAccounts from "./pages/user action pages/admin/activeaccounts";
import ManageActiveUser from "./pages/user action pages/admin/manageactiveuser";
import BidderAllBids from './pages/user action pages/bidder/allbids'
import BidderAllBidsDetail from './pages/user action pages/bidder/allbidsdetail'
import BidsInProgress from './pages/user action pages/bidder/bidsinprogress'
import BidsInProgressDetail from './pages/user action pages/bidder/bidsinprogressdetail'
import CancelledBidsDetail from './pages/user action pages/bidder/cancelledbidsdetail'
import CancelledBids from './pages/user action pages/phead/cancelledbids'
import ClosedBids from './pages/user action pages/phead/closedbids'
import BidderCancelled from './pages/user action pages/bidder/cancelledbids'
import BidderClosedBids from './pages/user action pages/bidder/closedbids'
import ClosedBidsDetail from './pages/user action pages/bidder/closedbidsdetail'
import AllBids from './pages/user action pages/phead/allbids'
import SpecificBid from "./pages/user action pages/phead/specificBid";
import NewBid from "./pages/user action pages/phead/newBid"
import ActiveBids from "./pages/user action pages/phead/activebids";
import ManageCancelledBid from './pages/user action pages/phead/managecancelledbid'
import ManageActiveBid from './pages/user action pages/phead/manageactivebid'
import ManageClosedBid from './pages/user action pages/phead/manageclosedbid'
import BidProposal from "./pages/action pages/bidproposalform";
import BidProps from "./pages/user action pages/phead/bidprops";
import BidProp from "./pages/user action pages/phead/bidprop";
import { BiMessageSquareDots } from "react-icons/bi";
import Messages from "./pages/messages";
import Message from "./pages/message";
import BackImage from "../src/resources/backg.jpg"
import PostBidAward from "./pages/user action pages/phead/postbidaward";
import ApproveRequiest from './pages/user action pages/pendch/approveRequiest'
import ApprovedTenders from './pages/user action pages/pendch/approvedTenders'
import RequestBidApproval from "./pages/user action pages/phead/requestbidapproval";
import BidAwardSuccess from "./pages/user action pages/phead/bidawardsuccess";
import BidRequestSuccess from "./pages/user action pages/phead/bidreqsuccess";
function App() {
  // fetch('http://localhost:3001/sendemail')
  // .then((res)=>res.json())
  // .then((res)=>{console.log(res)})
  // .catch((err)=>{console.log(err)})

  return (
    <div>
      <div >
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tenders" element={<Tenders />} />
          <Route path="about" element={<About />} />
          <Route path="signup" element={<SignUp />}/>
          <Route path="mailus" element={<Login />} />
          <Route path="tenders/:tid/apply/payment" element={<Payment />} />
          <Route path="tenders/:tid/apply/bid-document" element={<Biddocument/>} />
          <Route path="tenders/:tid/apply/bid-proposal" element={<BidProposal />} />
          <Route path="tenders/:tid/apply/success" element={<ApplicationSuccess />} />
          <Route path="waitforapproval" element={<WaitForApproval />} />
          <Route path="tenders/:tid" element={<Tender />} />
          <Route path="*" element={<Nopage />} />
          {/* <Route path="userpage" element={<Userpage/>}></Route>
          <Route path="manageuseraccount" element={<ManageUserAcc />} /> */}
        </Route>
        <Route path="login" element={<Login />} />

        <Route path="/userpage/admin/:id" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="/userpage/admin/:id/manage-accounts" element={<ManageUserAccount />} />
          <Route path="/userpage/admin/:id/manage-accounts/manage-user/:uid" element={<ManageUser />} />
          <Route path="/userpage/admin/:id/approval-requests" element={<ApprovalRequests />} />
          <Route path="/userpage/admin/:id/approval-requests/manage-user/:uid" element={<ManageApproval />} />
          <Route path="/userpage/admin/:id/banned-accounts" element={<BannedAccounts />} />
          <Route path="/userpage/admin/:id/banned-accounts/manage-user/:uid" element={<ManageBannedAccount />} />
          <Route path="/userpage/admin/:id/active-accounts" element={<ManageActiveAccounts />} />
          <Route path="/userpage/admin/:id/active-accounts/manage-user/:uid" element={<ManageActiveUser />} />
        </Route>
        <Route path="/userpage/supplier/:id" element={<SupplierLayout />}>
          <Route index element={<SupplierPage />} />
          <Route path="/userpage/supplier/:id/all-bids" element={<BidderAllBids />} />
          <Route path="/userpage/supplier/:id/all-bids/:bid" element={<BidderAllBidsDetail />} />
          <Route path="/userpage/supplier/:id/bids-in-progress" element={<BidsInProgress />} />
          <Route path="/userpage/supplier/:id/bids-in-progress/:bid" element={<BidsInProgressDetail />} />
          <Route path="/userpage/supplier/:id/cancelled-bids" element={<BidderCancelled />} />
          <Route path="/userpage/supplier/:id/cancelled-bids/:bid" element={<CancelledBidsDetail />} />
          <Route path="/userpage/supplier/:id/closed-bids" element={<BidderClosedBids />} />
          <Route path="/userpage/supplier/:id/closed-bids/:bid" element={<ClosedBidsDetail />} />
          <Route path="/userpage/supplier/:id/messages" element={<Messages />} />
          <Route path="/userpage/supplier/:id/messages/:mid" element={<Message />} />
        </Route>
        <Route path="/userpage/phead/:id" element={<PheadLayout />}>
          <Route index element={<PheadPage />} />
          <Route path="/userpage/phead/:id/manage-bids/all-bids" element={<AllBids/>}/>
          <Route path="/userpage/phead/:id/manage-bids/all-bids/:bid" element={<SpecificBid/>}/>
          <Route path="/userpage/phead/:id/manage-bids/active-bids" element={<ActiveBids/>}/>
          <Route path="/userpage/phead/:id/manage-bids/active-bids/:bid" element={<ManageActiveBid />}/>
          <Route path="/userpage/phead/:id/manage-bids/post-bid" element={<NewBid/>}/>
          <Route path="/userpage/phead/:id/manage-bids/cancelled-bids" element={<CancelledBids/>}/>
          <Route path="/userpage/phead/:id/manage-bids/cancelled-bids/:bid" element={<ManageCancelledBid/>}/>
          <Route path="/userpage/phead/:id/manage-bids/closed-bids" element={<ClosedBids/>}/>
          <Route path="/userpage/phead/:id/manage-bids/closed-bids/:bid" element={<ManageClosedBid/>}/>
          <Route path="/userpage/phead/:id/manage-bids/:bid/bid-props" element={<BidProps/>}/>
          <Route path="/userpage/phead/:id/manage-bids/:bid/bid-props/:bidp" element={<BidProp/>}/>
          <Route path="/userpage/phead/:id/manage-bids/:bid/post-bid-award" element={<PostBidAward/>}/>
          <Route path="/userpage/phead/:id/manage-bids/:bid/post-bid-award/success" element={<BidAwardSuccess/>}/>
          <Route path="/userpage/phead/:id/manage-bids/:bid/request-bid-approval" element={<RequestBidApproval/>}/>
          <Route path="/userpage/phead/:id/manage-bids/:bid/request-bid-approval/success" element={<BidRequestSuccess/>}/>


        </Route>
        <Route path="/userpage/pendch/:id" element={<PendchLayout />}>
          <Route index element={<PendchPage />} />
          <Route path="/userpage/pendch/:id/requiest-bids" element={<ApproveRequiest/>}/>
          <Route path="/userpage/pendch/:id/approved-tenders" element={<ApprovedTenders/>}/>
        </Route>
      </Routes>
       <div title="Go to the top of the page" className="bg-dark d-flex justify-content-center align-items-center" style={{width:'4rem',height:'4rem',position:'fixed',bottom:'1.5rem',right:'1rem',borderRadius:'0.5rem'}}>
         <a href="#top"><TbArrowBigUpLineFilled style={{width:'2rem',color:'white',height:'2rem'}}  />
        </a>
      </div>
      </BrowserRouter>
      </div>
      
      
      
      
    </div>
    
  
  );
}

export default App;
