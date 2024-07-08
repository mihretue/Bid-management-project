import { Link } from "react-router-dom";
import Footer from "../../../components/footer";
const Approval = () => {
  return (
    <>
      <div
        className="container border rounded mb-5 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "10rem" }}
      >
        <h1 className="text-center">Tender Successfully Approved</h1>
        <p className="text-center" style={{ maxWidth: "15rem" }}>
          Now the Tender is approved and bid award can be posted by the
          respective procurement deparment head.
        </p>
        <Link to="/">
          <button className="mt-2 mb-4 btn btn-success">Go to Home</button>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Approval;
