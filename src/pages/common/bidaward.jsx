import Footer from "../../components/footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const BidAward = () => {
  const { bid } = useParams();
  const [tender, setTender] = useState({});
  const [depHead, setDepHead] = useState({});
  const [participated, setParticipated] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  useEffect(() => {
    document.title = "Cheretanet | Bid Award Detail";
    fetchBid();
  }, []);
  const fetchBid = () => {
    setIsFetching(true);
    fetch(`http://localhost:3001/gettender?id=${bid}`)
      .then((res) => res.json())
      .then((res) => {
        setTender(res);
        fetchProcHead(res.ent);
      })
      .catch((err) => {
        setErrorFetching(true);
      });
  };

  const fetchProcHead = (ent) => {
    let q = { pBody: ent, role: "procurement department head" };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/userbyprop?${q}`)
      .then((res) => res.json())
      .then((res) => {
        setDepHead(res);
        if (localStorage.getItem("user")) {
          checkParticipationStatus();
        } else {
          setIsFetching(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorFetching(true);
      });
  };

  const checkParticipationStatus = () => {
    let q = {
      bidderId: JSON.parse(localStorage.getItem("user")).id,
      bidId: tender._id,
    };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/checkbidder?${q}`)
      .then((res) => res.json())
      .then((res) => {
        if (res == null) setParticipated(false);
        else setParticipated(true);
        setIsFetching(false);
      })
      .catch((err) => {
        setErrorFetching(true);
      });
  };

  return (
    <>
      {isFetching ? (
        <div className="container mx-auto p-3">
          <p className="text-center">Fetching bid award information</p>
        </div>
      ) : errorFetching ? (
        <div className="container mx-auto p-3">
          <p className="text-center text-danger">
            Error Fetching bid award information!
          </p>
        </div>
      ) : (
        <div className="container mb-5 mx-auto d-flex flex-column justify-content-center align-items-center">
          <h2 className="text-center">Bid Award Information</h2>
          <h6>Tender Details</h6>
          <ul>
            <li>
              Tender ID : <p className="m-0 d-inline fw-bold">{tender.id}</p>
            </li>
            <li>
              Tender Title :{" "}
              <p className="m-0 d-inline fw-bold">{tender.title}</p>
            </li>
          </ul>
          <h6 className="mt-2">Procuring Entity Details</h6>
          <ul>
            <li>
              Procuring Entity :{" "}
              <p className="m-0 d-inline fw-bold">{depHead.pBody}</p>
            </li>
            <li>
              Procurement Department Head Name :{" "}
              <p className="m-0 d-inline fw-bold">
                {depHead.fName + " " + depHead.lName}
              </p>
            </li>
            <li>
              Procuring Deparement Head Email :{" "}
              <p className="m-0 d-inline fw-bold">{depHead.email}</p>
            </li>
          </ul>
          {localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user")).role !==
              "procurement department head" && (
              <div>
                <h6 className="mt-2 text-center">Participation Status</h6>
                <p className="m-0">
                  {participated == true &&
                    "You have participated on this tender."}
                </p>
                <p className="m-0">
                  {participated == false &&
                    "You didn't participate on this tender."}
                </p>
              </div>
            )}
          <hr className="w-100" />
          <button className="btn btn-primary mt-2">
            <a
              download
              className="text-white text-decoration-none"
              href={`/backend/uploads/bidrequests/${tender.bidAwardFile}`}
            >
              View Bid Award
            </a>
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default BidAward;
