import { useState, useEffect } from "react";
import Footer from "../../components/footer";
import { useParams, Link } from "react-router-dom";

const ApplicationSuccess = () => {
  const [tender, setTender] = useState({});
  const { tid } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    fetchTenderDetails();
  }, []);
  const fetchTenderDetails = () => {
    setIsFetching(true);
    fetch(`http://localhost:3001/gettender/?id=${tid}`)
      .then((res) => res.json())
      .then((res) => {
        setTender(res);
        setIsFetching(false);
      })
      .catch((err) => {
        setErrorFetching(true);
      });
  };

  return (
    <>
      <div
        className="container border rounded mb-5 d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "10rem" }}
      >
        <h1>Application Successful!</h1>
        <p className="m-0">Details : </p>
        {isFetching ? (
          <div className="text-center p-3">Fetching Details..</div>
        ) : errorFetching ? (
          <div className="text-center p-3">Some Error Occurred!</div>
        ) : (
          <>
            <ul>
              <li>
                Tender Title :{" "}
                <p className="fw-bold m-0 d-inline-flex">{`${tender.title} - ${tender.ent}`}</p>
              </li>
              <li>
                Tender Opening Schedule :{" "}
                <p className="fw-bold m-0 d-inline-flex">{tender.open}</p>
              </li>
              <li>
                Applicant Name :{" "}
                <p className="fw-bold m-0 d-inline-flex">
                  {JSON.parse(localStorage.getItem("user")).name}
                </p>
              </li>
            </ul>
            <Link to="/">
              <button className="mt-2 mb-4 btn btn-success">Go to Home</button>
            </Link>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ApplicationSuccess;
