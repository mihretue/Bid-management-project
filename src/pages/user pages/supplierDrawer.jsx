import React from "react";
import { FaListAlt } from "react-icons/fa";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { Pane, Tablist, Tab } from "evergreen-ui";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineCancelPresentation } from "react-icons/md";
import img from "../../resources/backuser.jpg";
import Footer from "../../components/footer";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Statistic } from "antd";
import {
  UserSwitchOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
export default function SupplierDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const tabs = React.useMemo(() => ["Manage Bids", "Me"], []);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const [bids, setBids] = useState([]);
  const [activeBids, setactiveBids] = useState([]);
  const [cancelledBids, setcancelledBids] = useState([]);
  const [closedBids, setclosedBids] = useState([]);
  const [bidding, setBidding] = useState([]);
  const [BisFetching, setBIsFetching] = useState(true);
  const [BerrorFetching, setErrorBFetching] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    fetchUserData();
    fetchAllBids();
  }, []);

  const fetchUserData = () => {
    setIsFetching(true);
    fetch(`http://localhost:3001/userbyid/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
        setErrorFetching(true);
      });
  };

  //all tenders
  const fetchAllBidding = (bs) => {
    let q = { id: id };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/getbidding/?${q}`)
      .then((res) => res.json())
      .then((res) => {
        setBids(
          bs.filter((bid) => {
            return res.some((biddingItem) => biddingItem.bidId == bid._id);
          })
        );
        fetchActiveBids();
      })
      .catch((err) => {
        console.log(err);
        setErrorFetching(true);
      });
  };

  const fetchAllBids = () => {
    setIsFetching(true);
    fetch("http://localhost:3001/gettenders", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sortBy: "Title" }),
    })
      .then((res) => res.json())
      .then((res) => {
        fetchAllBidding(res);
      })
      .catch((err) => {
        setBids([]);
        setErrorFetching(true);
      });
  };

  //active
  const fetchActiveBidding = (as) => {
    let q = { id: id };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/getbidding/?${q}`)
      .then((res) => res.json())
      .then((res) => {
        let finalRes = res.filter((bIt) => {
          return bIt.bidderStatus == "bidding";
        });
        setactiveBids(
          as.filter((bid) => {
            return finalRes.some((biddingItem) => biddingItem.bidId == bid._id);
          })
        );
        fetchCancelledBids();
      })
      .catch((err) => {
        console.log(err);
        setErrorFetching(true);
      });
  };

  const fetchActiveBids = () => {
    fetch("http://localhost:3001/gettenders", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sortBy: "Title" }),
    })
      .then((res) => res.json())
      .then((res) => {
        let as = res.filter((rs) => {
          return rs.status == "active";
        });
        fetchActiveBidding(as);
      })
      .catch((err) => {
        setBids([]);
        setErrorFetching(true);
      });
  };

  //cancelled
  const fetchCancelledBidding = (cs) => {
    let q = { id: id };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/getbidding/?${q}`)
      .then((res) => res.json())
      .then((res) => {
        let finalRes = res.filter((bIt) => {
          return bIt.bidderStatus == "cancelled";
        });
        setcancelledBids(
          cs.filter((bid) => {
            return finalRes.some((biddingItem) => biddingItem.bidId == bid._id);
          })
        );
        fetchClosedBids();
      })
      .catch((err) => {
        console.log(err);
        setErrorFetching(true);
      });
  };

  const fetchCancelledBids = () => {
    fetch("http://localhost:3001/gettenders", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sortBy: "Title" }),
    })
      .then((res) => res.json())
      .then((res) => {
        fetchCancelledBidding(res);
      })
      .catch((err) => {
        setBids([]);
        setErrorFetching(true);
      });
  };

  //closed
  const fetchClosedBidding = (ds) => {
    let q = { id: id };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/getbidding/?${q}`)
      .then((res) => res.json())
      .then((res) => {
        setclosedBids(
          ds.filter((bid) => {
            return res.some((biddingItem) => biddingItem.bidId == bid._id);
          })
        );
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorFetching(true);
      });
  };

  const fetchClosedBids = () => {
    fetch("http://localhost:3001/gettenders", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sortBy: "Title" }),
    })
      .then((res) => res.json())
      .then((res) => {
        let ds = res.filter((rs) => {
          return rs.status == "closed";
        });
        fetchClosedBidding(ds);
      })
      .catch((err) => {
        setBids([]);
        setErrorFetching(true);
      });
  };

  const Email = JSON.parse(localStorage.getItem("user")).email;
  const Name = JSON.parse(localStorage.getItem("user")).fName;

  return (
    <>
      <Pane
        className="row mb-5 border p-3 shadow rounded container mx-auto  pb-5"
        style={{ height: "auto" }}
      >
        <Tablist className="col-md-3 col-12 mt-1" style={{ height: "auto" }}>
          {tabs.map((tab, index) => {
            return (
              <Tab
                aria-controls={`panel-${tab}`}
                direction="vertical"
                isSelected={index === selectedIndex}
                key={tab}
                onSelect={() => setSelectedIndex(index)}
                className="mt-3"
              >
                {tab}
              </Tab>
            );
          })}

          <div
            className="d-none d-md-flex flex-column justify-content-center align-items-center "
            style={{ marginTop: "10rem", height: "5rem" }}
          >
            <h6 className="text-center" style={{ fontFamily: "'Adamina'" }}>
              {Name + " " + JSON.parse(localStorage.getItem("user")).lName}
            </h6>
            <p className="fs-9 m-0 text-break text-center">{Email}</p>
          </div>
        </Tablist>
        <Pane
          className="col-md-9 col-12  "
          style={{ height: "auto", backgroundColor: "white" }}
        >
          {tabs.map((tab, index) => (
            <Pane
              aria-labelledby={tab}
              aria-hidden={index !== selectedIndex}
              display={index === selectedIndex ? "inline-block" : "none"}
              key={tab}
              role="tabpanel"
              className="container-fluid"
            >
              {tab == "Manage Bids" ? (
                <div
                  className="w-100"
                  style={{ minHeight: "10rem", height: "auto" }}
                >
                  <h3
                    className="m-0 text-center fs-6 mt-1"
                    style={{ fontFamily: "'Adamina'" }}
                  >
                    Manage Bids
                  </h3>
                  <div
                    className="row g-3 justify-between container-fluid my-3 mx-auto"
                    style={{ minHeight: "10rem", height: "auto" }}
                  >
                    <div
                      style={{ cursor: "pointer" }}
                      i
                      onClick={() => {
                        navigate(`/userpage/supplier/${id}/all-bids`);
                      }}
                      className="col-6 d-flex flex-column align-items-center justify-content-center"
                    >
                      <FaListAlt
                        style={{ width: "4rem", height: "4rem", color: "blue" }}
                      />
                      <p
                        className="text-center"
                        style={{
                          fontWeight: "bold",
                          fontFamily: "'Adamina',serif",
                        }}
                      >
                        All Tenders You <br />
                        <span className="text-center ml-2">
                          Involved In
                        </span>{" "}
                      </p>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/userpage/supplier/${id}/bids-in-progress`);
                      }}
                      className="col-6 ms-auto ms-md-0 d-flex flex-column align-items-center justify-content-center"
                    >
                      <GrInProgress
                        style={{
                          width: "2.5rem",
                          height: "3rem",
                          color: "yellowgreen",
                        }}
                      />
                      <p
                        className="text-center"
                        style={{
                          fontWeight: "bold",
                          fontFamily: "'Adamina',serif",
                        }}
                      >
                        Bids in Progress
                      </p>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/userpage/supplier/${id}/cancelled-bids`);
                      }}
                      className="col-6 ms-auto ms-md-0 d-flex flex-column align-items-center justify-content-center"
                    >
                      <MdOutlineCancelPresentation
                        style={{ width: "4rem", height: "4rem", color: "red" }}
                      />
                      <p
                        className="text-center"
                        style={{
                          fontWeight: "bold",
                          fontFamily: "'Adamina',serif",
                        }}
                      >
                        Cancelled Bids
                      </p>
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/userpage/supplier/${id}/closed-bids`);
                      }}
                      className="col-6 ms-auto ms-md-0 d-flex flex-column align-items-center justify-content-center"
                    >
                      <IoCheckmarkDoneCircleOutline
                        style={{
                          width: "4rem",
                          height: "4rem",
                          color: "darkslategray",
                        }}
                      />
                      <br />
                      <p
                        className="text-center"
                        style={{
                          fontWeight: "bold",
                          fontFamily: "'Adamina',serif",
                        }}
                      >
                        Closed Bids
                      </p>
                    </div>
                  </div>
                </div>
              ) : tab == "Me" ? (
                <div
                  className="w-100"
                  style={{
                    minHeight: "10rem",
                    height: "auto",
                    backgroundImage: { img },
                  }}
                >
                  <h3 className="m-0 text-center fs-6 mt-1">Me</h3>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Total Tenders"
                          value={bids.length}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<FileDoneOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Your Active Tenders"
                          value={activeBids.length}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<CheckCircleOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Cancelled Tenders"
                          value={cancelledBids.length}
                          valueStyle={{ color: "#cf1322" }}
                          prefix={<CloseCircleOutlined />}
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card bordered={false}>
                        <Statistic
                          title="Closed Tenders"
                          value={closedBids.length}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<FileExcelOutlined />}
                        />
                      </Card>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Card
                        bordered={false}
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Statistic
                          title="Account Status"
                          value={user.status}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<UserSwitchOutlined />}
                        />
                      </Card>
                    </Col>
                  </Row>
                </div>
              ) : tab == "Other" ? (
                <p>heh</p>
              ) : (
                <p>hi</p>
              )}
            </Pane>
          ))}
        </Pane>
      </Pane>
      <Footer />
    </>
  );
}
