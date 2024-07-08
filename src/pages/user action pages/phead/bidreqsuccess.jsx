import { Link } from "react-router-dom";
import Footer from "../../../components/footer";
const BidRequestSuccess = () => {
  return (
    <>
      <div
        className="container border rounded mb-5 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "10rem" }}
      >
        <h1 className="text-center">
          Bid Approval Request Is Successfully Sent!
        </h1>
        <p className="text-center" style={{ maxWidth: "15rem" }}>
          Now the procurement endorsing committee will review the bid approval
          request and respond.
        </p>
        <Link to="/">
          <button className="mt-2 mb-4 btn btn-success">Go to Home</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default BidRequestSuccess;
