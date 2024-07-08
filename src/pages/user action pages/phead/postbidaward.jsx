import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "../../../components/footer";
import { useEffect, useState } from "react";

const PostBidAward = () => {
  const { id, bid } = useParams();

  useEffect(() => {
    fetchBid();
  }, []);

  const [tender, setTender] = useState({});
  const [isChecking, setIsChecking] = useState(false);
  const [errorChecking, setErrorChecking] = useState(false);
  const [errorSaving, setErrorSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorUploading, setErrorUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [award, setAward] = useState({ bidAwardFile: "" });
  const [endorser, setEndorser] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errorIsFetching, setErrorFetching] = useState(false);
  const navigate = useNavigate();

  const fetchEndorsingCInfo = () => {
    setIsFetching(true);
    let q = {
      pBody: JSON.parse(localStorage.getItem("user")).pBody,
      role: "procurement endorsing committee head",
    };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/userbyprop?${q}`)
      .then((res) => res.json())
      .then((res) => {
        setEndorser(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setErrorFetching(true);
      });
  };

  const fetchBid = () => {
    setIsChecking(true);
    fetch(`http://localhost:3001/gettender?id=${bid}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTender(res);
        fetchEndorsingCInfo();
        setIsChecking(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorChecking(true);
      });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);
    fetch("http://localhost:3001/uploadbidaward", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        setUploading(false);
        if (res.res == "error") {
          setErrorUploading(true);
        } else {
          setUploaded(true);
          setAward({ ...award, bidAwardFile: res.res });
          document.getElementById("asub_btn").hidden = false;
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorUploading(true);
      });
  };

  const saveBidAward = (file) => {
    fetch(`http://localhost:3001/savebidaward/${bid}`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(award),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.res == "ok") {
          setTimeout(() => {
            navigate(
              `/userpage/phead/${id}/manage-bids/${bid}/post-bid-award/success`
            );
          }, []);
        } else {
          setErrorSaving(true);
        }
      })
      .catch((err) => {
        setErrorSaving(true);
      });
  };

  const [file, setFile] = useState(null);

  return (
    <>
      {isChecking ? (
        <div
          className="container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto border rounded p-7"
          style={{ width: "60%" }}
        >
          <p className="text-center p-3">Please Wait...</p>
        </div>
      ) : errorChecking ? (
        <div
          className="container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto border rounded p-7"
          style={{ width: "60%" }}
        >
          <p className="text-center p-3">
            Some Error Occurred, Please Reload The Page.
          </p>
        </div>
      ) : (
        <>
          {!tender.approvalRequested && tender.approved && (
            <div className="container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto">
              <h2 className="text-center">Post Bid Award</h2>
              <div className="w-50 mt-2 mx-auto d-flex flex-column justify-content-center align-items-center">
                <h6>Tender Information</h6>
                <ul className="list-unstyled">
                  <li>
                    Tender Id :{" "}
                    <p className="m-0 d-inline fw-bold">{tender.id}</p>
                  </li>
                  <li>
                    Tender Title :{" "}
                    <p className="m-0 d-inline fw-bold">{tender.title}</p>
                  </li>
                  <li></li>
                  <li></li>
                </ul>
                <h6>To be approved by :</h6>
                <ul className="list-unstyled">
                  <li>
                    Name :{" "}
                    <p className="m-0 d-inline fw-bold">
                      {endorser.fName + " " + endorser.lName}
                    </p>
                  </li>
                  <li>
                    Email :{" "}
                    <p className="m-0 d-inline fw-bold">{endorser.email}</p>
                  </li>
                </ul>
                <hr className="w-100" />
                <form
                  onSubmit={handleFileSubmit}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <input
                    id="file_input"
                    hidden
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <button type="button" className="btn btn-primary">
                    <label className="text-white" htmlFor="file_input">
                      Attach Bid Document ( pdf format )
                    </label>
                  </button>
                  <p className="m-0">{file && "File Attached."}</p>
                  <button type="submit" className="mt-2 btn btn-secondary">
                    Upload
                  </button>
                  <p className="m-0">
                    {uploading
                      ? "Uploading File"
                      : errorUploading
                      ? "Error Uploading File"
                      : uploaded && "Successfully Uploaded!"}
                  </p>
                </form>
                <button
                  id="asub_btn"
                  hidden
                  onClick={saveBidAward}
                  type="button"
                  className="mt-2 btn btn-success"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {!tender.approvalRequested && !tender.approved && (
            <div
              className="container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto border rounded p-7"
              style={{ width: "60%" }}
            >
              <p className="text-center">
                To Post Bid Award, The Tender Should Be Approved.
              </p>
              <button
                onClick={() => {
                  navigate(
                    `/userpage/phead/${id}/manage-bids/${bid}/request-bid-approval`
                  );
                }}
                className="btn btn-primary mb-3"
              >
                Request Approval
              </button>
            </div>
          )}
          
          {tender.approvalRequested == true && !tender.approved && (
            <div
              className="container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto border rounded p-7"
              style={{ width: "60%" }}
            >
              <p className="text-center">
                You have already requested for approval, please wait for the
                response.
              </p>
              <div className="container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto">
                <button
                  onClick={() => {
                    navigate("/");
                  }}
                  className="d-block mx-auto btn mt-3 btn-primary"
                >
                  Back To Dashboard
                </button>
              </div>
            </div>
          )}
        </>
      )}
      <Footer />
    </>
  );
};
export default PostBidAward;
