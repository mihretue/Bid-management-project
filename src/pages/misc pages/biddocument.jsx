import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
const Biddocument = () => {
  const { tid } = useParams();
  const navigate = useNavigate();
  const [bidDocument, setBidDocument] = useState("");
  const [isGetting, setIsGetting] = useState(false);
  const [errorGetting, setErrorGetting] = useState(false);
  useEffect(() => {
    fetchBidDocument();
  }, []);
  
  const fetchBidDocument = () => {
    setIsGetting(true);
    fetch(`http://localhost:3001/gettender/?id=${tid}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setBidDocument(res.bidDocFile);
        setIsGetting(false);
      })
      .catch((err) => {
        setErrorGetting(true);
        console.log(err);
      });
  };

  return (
    <>
      {localStorage.getItem("user") ? (
        <div
          className="container d-flex flex-column justify-content-center align-items-center border rounded mb-5"
          style={{ minHeight: "15rem", height: "auto" }}
        >
          <h6
            className="text-center pt-4 word-break mx-auto"
            style={{ maxWidth: "20rem" }}
          >
            To apply for this bid, you need to download and view the bid
            document{" "}
          </h6>
          <a
            disabled
            download={!isGetting && !errorGetting}
            href={
              isGetting || errorGetting
                ? "/#"
                : `/../../../backend/uploads/biddocs/${bidDocument}`
            }
          >
            <button
              onClick={() => {
                setTimeout(() => {
                  document.getElementById("cont_btn").hidden = false;
                }, 5000);
              }}
              className="btn btn-primary"
            >
              Download Bid Document
            </button>
          </a>
          <p>
            {isGetting
              ? "Getting Bid Document..."
              : errorGetting
              ? "Error Getting Bid Document, Plese Reload This Page"
              : ""}
          </p>
          <button
            id="cont_btn"
            onClick={() => {
              navigate(`/tenders/${tid}/apply/bid-proposal`);
            }}
            hidden
            className="btn btn-success mt-2"
          >
            Continue Application
          </button>
        </div>
      ) : (
        <div
          className="container border rounded mb-5"
          style={{ minHeight: "15rem", height: "auto" }}
        >
          <h4
            className="text-center pt-4 word-break mx-auto"
            style={{ maxWidth: "20rem" }}
          >
            To apply for bids, you need to log in.{" "}
          </h4>
          <Link
            to="/login"
            className="mx-auto d-flex align-items-center flex-column mt-3 justify-content-center"
          >
            <button className="btn btn-primary" style={{ maxWidth: "10rem" }}>
              Log in
            </button>
          </Link>
          <p className="text-center mt-2">Or, if you don't have an account, </p>
          <Link
            to="/signup"
            className="mx-auto d-flex align-items-center flex-column mt-3 justify-content-center"
          >
            <button className="btn btn-secondary" style={{ maxWidth: "10rem" }}>
              Sign Up
            </button>
          </Link>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Biddocument;
