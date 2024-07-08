import React, { useState } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import { Link, useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { BiError } from "react-icons/bi";
import { BiLinkExternal } from "react-icons/bi";
import { BsArrowCounterclockwise } from "react-icons/bs";
import Footer from "../../components/footer";
import { BsArrowLeft } from "react-icons/bs";
import { Alert, LoadingButton } from "@mui/lab";
import { v4 as uuidv4 } from "uuid";
import { Dialog } from "evergreen-ui";
const Tender = () => {
  useEffect(() => {
    document.title = "Cheretanet | Tender Information";
  }, []);

  useEffect(() => {
    fetchTenderDetails();
  }, []);

  const navigate = useNavigate();
  const [tender, setTender] = useState({});
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);
  const [tc, setTc] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const { tid } = useParams();
  const [isChecking, setIsChecking] = useState(false);
  const [errorChecking, setErrorChecking] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState({
    payment_loading: false,
    verify_loading: false,
  });
  const [paymentRef, setPaymentRef] = useState("");
  const [modal, setModal] = useState({
    verify_modal: false,
    must_login: false,
  });
  const [verif_result, setVerifResult] = useState("");
  const generateId = () => {
    return uuidv4();
  };

  const fetchTenderDetails = () => {
    setIsFetching(true);
    fetch(`http://localhost:3001/gettender?id=${tid}`)
      .then((res) => res.json())
      .then((res) => {
        setTender(res);

        setRows([
          { title: "Invitation Date", Information: res.invD },
          { title: "Procurement ID", Information: res.id },
          { title: "Procurement Title", Information: res.title },
          { title: "Procurement Category", Information: res.cat },
          { title: "Market Type", Information: res.app },
          { title: "Procurement Method", Information: "Open" },
          { title: "Site Visit Schedule", Information: res.visit },
          { title: "Bid Submission Deadline", Information: res.dead },
          { title: "Bid Opening Schedule", Information: res.ent },
        ]);

        setRows2([
          { title: "Participation Fee", Information: res.pfee },
          { title: "Bid Security Amount", Information: res.bidSec },
        ]);

        setRows3([
          { title: "Valid tax clearance certificate", Information: res.vTax },
          { title: "Conflict of Interest", Information: res.coi },
          {
            title:
              "Valid trade license or business organization registration certificate",
            Information: res.lic,
          },
          { title: "Debarred by decision of the FPPA", Information: res.lg },
          { title: "Form Data on Joint Ventures", Information: res.vent },
          { title: "Nationality", Information: res.nat },
          { title: "VAT registration certificate", Information: res.vat },
          { title: "Government Owned Entity", Information: res.gow },
        ]);

        setTc(res.tc);

        setIsFetching(false);

        if (res.status == "closed" || res.status == "cancelled") {
          if (res.status == "closed") setStatus("closed-bid");
          else setStatus("cancelled-bid");
        } else {
          if (localStorage.getItem("user")) {
            fetchBidderStatus();
          } else {
            setStatus("not-user");
          }
        }
      })
      .catch((err) => {
        setErrorFetching(true);
      });
  };

  const fetchBidderStatus = () => {
    setIsChecking(true);
    let q = { bid: tid, uid: JSON.parse(localStorage.getItem("user")).id };
    q = new URLSearchParams(q);

    fetch(`http://localhost:3001/checkbidder?${q}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("ress here", res);
        setIsChecking(false);
        if (res !== null) {
          if (Object.keys(res).length == 0) {
            setStatus("not-bidding");
          } else {
            if (res.bidderStatus == "bidding") setStatus("bidding");
            else if (res.bidderStatus == "cancelled") setStatus("cancelled");
            else;
          }
        } else {
          setStatus("not-bidding");
        }
      })
      .catch((err) => {
        setErrorChecking(true);
      });
  };

  const handleApplyButtonClick = (event) => {
    event.preventDefault();
    if (localStorage.getItem("user")) {
      handlePayment(tender.pfee, tender.bidSec);
    } else {
      setStatus("not-user");
      setModal({ ...modal, must_login: true });
    }
  };

  const handlePayment = async (pfee, bidSec) => {
    console.log("inside the handle payment");
    setLoading({ ...loading, payment_loading: true });
    const user = JSON.parse(localStorage.getItem("user"));
    const amount = (parseFloat(pfee) + parseFloat(bidSec)).toFixed(2);
    const tx_ref = generateId();
    console.log(tx_ref);

    setPaymentRef(tx_ref);

    const payload = {
      amount: amount,
      email: user.email,
      first_name: user.fName,
      last_name: user.lName,
      currency: "ETB",
      tx_ref: tx_ref,
      customization: {
        title: "Payment",
        description: "Payment for the premium subscription",
      },
    };

    try {
      const response = await fetch(
        "http://chapa.payment.api.codenilesolutions.com/api/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.redirect_url) {
        setLoading({ ...loading, payment_loading: false });
        window.open(data.redirect_url, "_blank");
        setModal({ ...modal, verify_modal: true });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const redirectToApplication = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const url = `/userpage/supplier/${user.id}/tenders/${tid}/apply/bid-document`;
    setTimeout(() => {
      setModal({ ...modal, verify_modal: false });
      navigate(url);
    }, 5000);
  };

  const verifyPayment = () => {
    setLoading({ ...loading, verify_loading: true });
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer CHASECK_TEST-t4ayH0OpfLRj94eWeUcK6UikXXxkJaHL"
    );

    fetch(
      `http://chapa.payment.api.codenilesolutions.com/api/chapa/callback/${paymentRef}`,
      {
        method: "POST",
        headers: myHeaders,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("ress", res);
        if (res.details.status == "success") {
          setVerifResult("success");
          setPaymentRef("");
          setLoading({ ...loading, verify_loading: false });
          redirectToApplication();
        }

        if (res.details.status == "failed") {
          setLoading({ ...loading, verify_loading: false });
          setVerifResult("failed");
        }
      })
      .catch((err) => {
        setVerifResult("error-checking");
        setLoading({ ...loading, verify_loading: false });
        console.log("error", err);
      });
  };

  const userRole = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role == "bidder"
      ? "supplier"
      : ""
    : "";

  const redirectTo = localStorage.getItem("user")
    ? `/userpage/${userRole}/${
        JSON.parse(localStorage.getItem("user")).id
      }/tenders`
    : "/tenders";

  return (
    <>
      <div className="container mb-3">
        <a className="icon-link text-decoration-none text-black">
          <BsArrowLeft className="me-2" />
          <Link className="text-decoration-none" to={redirectTo}>
            Back to All Tenders
          </Link>
        </a>
      </div>
      {isFetching ? (
        <div
          style={{
            minHeight: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="1.5rem" color="secondary" />
          <p
            style={{
              fontFamily:
                "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
              margin: "0",
              textAlign: "center",
            }}
          >
            Fetching Tender Information...
          </p>
        </div>
      ) : errorFetching ? (
        <div
          className="mb-5"
          style={{
            minHeight: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BiError size="1.5rem" />
          <p
            style={{
              fontFamily:
                "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
              margin: "0",
              textAlign: "center",
              color: "red",
            }}
          >
            An Error Occurred!
          </p>
          <Button
            onClick={() => {
              fetchTenderDetails();
              setIsFetching(true);
              setErrorFetching(false);
            }}
            style={{ textTransform: "none" }}
            color="secondary"
            className="mt-3"
            variant="outlined"
            size="small"
            endIcon={<BsArrowCounterclockwise />}
          >
            Try Again
          </Button>
        </div>
      ) : (
        <div
          className="container mb-5"
          style={{
            padding: "0rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "90%",
              margin: "auto",
              overflow: "hidden",
              border: "0.1rem solid gray",
            }}
          >
            <TableContainer sx={{ height: "auto" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align={"start"}
                      colSpan={2}
                      className="border-success border-bottom"
                      style={{
                        fontWeight: "bold",
                        fontFamily:
                          "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                      }}
                    >
                      {"Tender Information"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow
                        style={{ fontSize: "0.8rem", minHeight: "1rem" }}
                        key={row.id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            width: "35%",
                            borderRight: "0.1rem solid gray",
                            fontFamily:
                              "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            fontSize: "inherit",
                          }}
                          align={"center"}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          style={{
                            align: "start",
                            fontFamily:
                              "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            fontSize: "inherit",
                          }}
                          align={"center"}
                        >
                          {row.Information}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper
            className="mt-3"
            sx={{
              width: "90%",
              margin: "auto",
              overflow: "hidden",
              border: "0.1rem solid gray",
            }}
          >
            <TableContainer sx={{ height: "auto" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align={"start"}
                      colSpan={2}
                      className="border-success border-bottom"
                      style={{
                        fontWeight: "bold",
                        fontFamily:
                          "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                      }}
                    >
                      {"Required Payments"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows2.map((row) => {
                    return (
                      <TableRow
                        style={{ fontSize: "0.8rem", minHeight: "1rem" }}
                        key={row.id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            width: "35%",
                            borderRight: "0.1rem solid gray",
                            fontFamily:
                              "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            fontSize: "inherit",
                          }}
                          align={"center"}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          style={{
                            align: "start",
                            fontFamily:
                              "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            fontSize: "inherit",
                          }}
                          align={"center"}
                        >
                          {row.Information}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper
            className="mt-3"
            sx={{
              width: "90%",
              margin: "auto",
              overflow: "hidden",
              border: "0.1rem solid gray",
            }}
          >
            <TableContainer sx={{ height: "auto" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align={"start"}
                      colSpan={2}
                      className="border-success border-bottom"
                      style={{
                        fontWeight: "bold",
                        fontFamily:
                          "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                      }}
                    >
                      {"Eligibility Documents"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows3.map((row) => {
                    return (
                      <TableRow
                        style={{ fontSize: "0.8rem", minHeight: "1rem" }}
                        key={row.id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell
                          style={{
                            fontWeight: "bold",
                            width: "35%",
                            borderRight: "0.1rem solid gray",
                            fontFamily:
                              "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            fontSize: "inherit",
                          }}
                          align={"center"}
                        >
                          {row.title}
                        </TableCell>
                        <TableCell
                          style={{
                            align: "start",
                            fontFamily:
                              "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            fontSize: "inherit",
                          }}
                        >
                          {row.Information}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper
            className="mt-3"
            sx={{
              width: "90%",
              margin: "auto",
              overflow: "hidden",
              border: "0.1rem solid gray",
            }}
          >
            <TableContainer sx={{ height: "auto" }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align={"start"}
                      colSpan={2}
                      className="border-success border-bottom"
                      style={{
                        fontWeight: "bold",
                        fontFamily:
                          "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                      }}
                    >
                      {"Notice"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    style={{ fontSize: "0.8rem", minHeight: "1rem" }}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell
                      style={{
                        fontWeight: "bold",
                        width: "35%",
                        borderRight: "0.1rem solid gray",
                        fontFamily:
                          "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                        fontSize: "inherit",
                      }}
                      align={"center"}
                    >
                      Terms and Conditions
                    </TableCell>
                    <TableCell
                      style={{
                        align: "start",
                        fontFamily:
                          "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                        fontSize: "inherit",
                      }}
                    >
                      {tc}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <small className="mt-3 text-danger">
            {status == "cancelled" && "YOU WITHDREW THIS BID"}
          </small>

          {/* <Link
            to={
              status == "not-bidding" ||
              status == "cancelled" ||
              status == "not-user"
                ? `./apply/payment`
                : "#"
            }
            target="about"
          > */}
          {!loading.payment_loading ? (
            <Button
              onClick={handleApplyButtonClick}
              disabled={
                isChecking
                  ? true
                  : errorChecking
                  ? true
                  : status == "bidding"
                  ? true
                  : tender.status == "closed"
                  ? true
                  : tender.status == "cancelled"
                  ? true
                  : false
              }
              endIcon={
                (status == "not-user" ||
                  status == "not-bidding" ||
                  status == "cancelled") && <BiLinkExternal />
              }
              variant="contained"
              color="primary"
              style={{
                margin: "1rem auto",
                maxWidth: "20rem",
                textTransform: "none",
              }}
            >
              {isChecking == true
                ? "Checking Status..."
                : errorChecking == true
                ? "Some Error Occurred"
                : status == "bidding"
                ? "You have already applied for this bid"
                : status == "cancelled"
                ? "Apply For This Bid Again"
                : tender.status == "closed"
                ? "This Tender Is Closed!"
                : tender.status == "cancelled"
                ? "This Tender Is Cancelled!"
                : "Apply For This Bid"}
            </Button>
          ) : (
            <LoadingButton
              loadingPosition="start"
              loading
              variant="contained"
              color="primary"
              style={{
                margin: "1rem auto",
                maxWidth: "20rem",
                textTransform: "none",
              }}
            >
              Loading...
            </LoadingButton>
          )}
          {/* </Link> */}

          {tender.status == "closed" && (
            <button
              onClick={() => {
                navigate(`/bid-awards`);
              }}
              className="mt-0 btn btn-primary"
            >
              View Bid Award
            </button>
          )}
        </div>
      )}

      <Dialog
        isShown={modal.verify_modal}
        title="Verify Payment"
        onCloseComplete={() => {
          () => {
            setModal({ ...modal, verify_modal: false });
          };
        }}
        confirmLabel="Yes"
        onCancel={() => {
          () => {
            setModal({ ...modal, verify_modal: false });
          };
        }}
        onConfirm={() => {
          setIsShown(false);
          localStorage.removeItem("user");
          navigate("/");
        }}
        footer={[]}
      >
        <div className="w-100 d-flex flex-column justify-content-center align-items-center px-3">
          <small className="text-center">
            Paymnet Page is open in another tab. Once you complete the
            transaction, click on verify payment below.
          </small>
          {loading.verify_loading ? (
            <LoadingButton
              loadingPosition="start"
              loading
              variant="contained"
              color="primary"
              className="mt-3"
            >
              Verifying Payment...
            </LoadingButton>
          ) : (
            <Button
              variant="contained"
              className="mt-3"
              onClick={verifyPayment}
              disabled={verif_result == "success"}
            >
              Verify Payment
            </Button>
          )}

          {!loading.verify_loading && verif_result && (
            <div className="mt-3">
              {verif_result == "success" ? (
                <div className="d-flex flex-column">
                  <Alert severity="success">Payment Verified!</Alert>
                  <small className="text-center mt-2">Redirecting...</small>
                </div>
              ) : (
                <div>
                  <Alert severity="error">Payment has failed!</Alert>
                </div>
              )}
            </div>
          )}
        </div>
      </Dialog>

      <Dialog
        isShown={modal.must_login}
        title="Must Login"
        onCloseComplete={() => {
          () => {
            setModal({ ...modal, must_login: false });
          };
        }}
        confirmLabel="Yes"
        onCancel={() => {
          () => {
            setModal({ ...modal, must_login: false });
          };
        }}
        footer={[]}
      >
        <div className="w-100 d-flex flex-column justify-content-center align-items-center px-3">
          <small className="text-center">
            To Participate in Bids, You must Login
          </small>
          <div className="d-flex mt-3">
            <Link to={"/login"}>
              <Button variant="contained">Sign In</Button>
            </Link>
            <Link to={"/signup"}>
              <Button className="ms-2" variant="outlined">
                Create New Account
              </Button>
            </Link>
          </div>
        </div>
      </Dialog>
      <Footer />
    </>
  );
};
export default Tender;
