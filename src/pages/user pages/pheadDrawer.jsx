import React from "react";
import { useNavigate } from "react-router-dom";
import { Pane, Tablist, Tab, Paragraph } from "evergreen-ui";
import { FaListAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GrInProgress } from "react-icons/gr";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { Card, Col, Row, Statistic } from "antd";
import {
  UserSwitchOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
export default function PheadDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const tabs = React.useMemo(() => ["Manage Tenders", "Me"], []);
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [BidsisFetching, setBidsIsFetching] = useState(true);
  const [errorBidsFetching, setErrorBidsFetching] = useState(false);
  const [Cbids, setCBids] = useState([]);
  const [CBidsisFetching, setCBidsIsFetching] = useState(false);
  const [errorCBidsFetching, setErrorCBidsFetching] = useState(false);
  const [ACbids, setAcBids] = useState([]);
  const [AcBidsisFetching, setAcBidsIsFetching] = useState(false);
  const [errorAcBidsFetching, setErrorAcBidsFetching] = useState(false);
  const [Clbids, setClBids] = useState([]);
  const [ClBidsisFetching, setClBidsIsFetching] = useState(false);
  const [errorClBidsFetching, setErrorClBidsFetching] = useState(false);

  const fetchBids = () => {
    setBidsIsFetching(true);
    fetch("http://localhost:3001/getbids", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ent: JSON.parse(localStorage.getItem("user")).pBody,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setBids(res);
        console.log(res);
        setBidsIsFetching(false);
      })
      .catch((err) => {
        setBids([]);
        setErrorBidsFetching(true);
      });
  };

  const fetchCancelledBids = () => {
    setCBidsIsFetching(true);
    fetch("http://localhost:3001/getbids/cancelled", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ent: JSON.parse(localStorage.getItem("user")).pBody,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCBids(res);
        console.log(res);
        setCBidsIsFetching(false);
      })
      .catch((err) => {
        setCBids([]);
        setErrorCBidsFetching(true);
      });
  };

  const fetchActiveBids = () => {
    setAcBidsIsFetching(true);
    fetch("http://localhost:3001/getbids/active", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ent: JSON.parse(localStorage.getItem("user")).pBody,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAcBids(res);
        console.log(res);
        setAcBidsIsFetching(false);
      })
      .catch((err) => {
        setCBids([]);
        setErrorAcBidsFetching(true);
      });
  };

  const fetchClosedBids = () => {
    setAcBidsIsFetching(true);
    fetch("http://localhost:3001/getbids/closed", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ent: JSON.parse(localStorage.getItem("user")).pBody,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setClBids(res);
        setClBidsIsFetching(false);
      })
      .catch((err) => {
        setClBids([]);
        setErrorClBidsFetching(true);
      });
  };
  
  const fetchUserData = () => {
    setIsFetching(true);
    fetch(`http://localhost:3001/userbyid/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        setIsFetching(false);
      });
  };
  
  useEffect(() => {
    fetchUserData();
    fetchBids();
    fetchCancelledBids();
    fetchActiveBids();
    fetchClosedBids();
  }, []);


  return (
    <Pane
      className="row p-3 container mb-5 mx-auto shadow border rounded pb-5"
      style={{ height: "auto" }}
    >
      <Tablist className="col-md-3 col-12" style={{ height: "auto" }}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
              className="mt-1"
            >
              {tab}
            </Tab>
          );
        })}
        <div
          className="d-none d-md-flex flex-column mb-5 justify-content-center align-items-center"
          style={{ marginTop: "17rem", height: "5rem" }}
        >
          <h6 className="text-center">
            {JSON.parse(localStorage.getItem("user")).name}
          </h6>
          <p className="fs-9 m-0 text-break text-center">
            {JSON.parse(localStorage.getItem("user")).email}
          </p>
          <p className="fs-9 m-0 text-break text-center">
            Procurement Department Head at :{" "}
          </p>
          <p className="fs-9 m-0 text-break text-center fw-bold">
            {JSON.parse(localStorage.getItem("user")).pBody}
          </p>
        </div>
      </Tablist>
      <Pane className="col-md-9 col-12 panew" style={{ height: "auto" }}>
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? "inline-block" : "none"}
            key={tab}
            role="tabpanel"
            className="container-fluid"
          >
            {tab == "Manage Tenders" ? (
              <div
                className="w-100"
                style={{ minHeight: "10rem", height: "auto" }}
              >
                <h3 id="pro" className="m-0 text-center fs-6">
                  Manage Tenders
                </h3>
                <div
                  className="row g-3 justify-between container-fluid my-3 mx-auto"
                  style={{ minHeight: "10rem", height: "auto" }}
                >
                  <div
                    id="pro"
                    onClick={() => {
                      navigate(`/userpage/phead/${id}/manage-bids/post-bid`);
                    }}
                    style={{ cursor: "pointer" }}
                    className="cursor-pointer col-12 d-flex flex-column align-items-center justify-content-center"
                  >
                    <MdAssignmentAdd
                      style={{
                        width: "3rem",
                        height: "3rem",
                        color: "#2fdb18",
                      }}
                    />
                    <p className="m-0 fs-6 text-center">Post Tender</p>
                  </div>
                  <div
                    id="pro"
                    onClick={() => {
                      navigate(`/userpage/phead/${id}/manage-bids/all-bids`);
                    }}
                    style={{ cursor: "pointer" }}
                    className="col-6 d-flex flex-column align-items-center justify-content-center"
                  >
                    <FaListAlt
                      style={{
                        width: "3rem",
                        height: "3rem",
                        color: "#0aa0f7",
                      }}
                    />
                    <p className="m-0 fs-6 text-center">All Tenders</p>
                  </div>
                  <div
                    id="pro"
                    onClick={() => {
                      navigate(`/userpage/phead/${id}/manage-bids/active-bids`);
                    }}
                    style={{ cursor: "pointer" }}
                    className=" col-6 d-flex flex-column align-items-center justify-content-center"
                  >
                    <GrInProgress
                      style={{ width: "3rem", height: "3rem", color: "red" }}
                    />
                    <p className="m-0 fs-6 text-center">Active Tenders</p>
                  </div>
                  <div
                    id="pro"
                    onClick={() => {
                      navigate(
                        `/userpage/phead/${id}/manage-bids/cancelled-bids`
                      );
                    }}
                    style={{ cursor: "pointer" }}
                    className="ms-md-0 col-6  d-flex flex-column align-items-center justify-content-center"
                  >
                    <MdOutlineCancelPresentation
                      style={{ width: "4rem", height: "4rem", color: "red" }}
                    />
                    <p className="m-0 fs-6 text-center ">Cancelled Tenders</p>
                  </div>
                  <div
                    id="pro"
                    onClick={() => {
                      navigate(`/userpage/phead/${id}/manage-bids/closed-bids`);
                    }}
                    style={{ cursor: "pointer" }}
                    className="ms-md-0 col-6  d-flex flex-column align-items-center justify-content-center"
                  >
                    <AiOutlineFileDone
                      style={{
                        width: "4rem",
                        height: "4rem",
                        color: "#e04d0d",
                      }}
                    />
                    <p className="m-0 fs-6 text-center">Closed Tenders</p>
                  </div>
                </div>
              </div>
            ) : tab == "Me" ? (
              <div
                className="w-100"
                style={{ minHeight: "10rem", height: "auto" }}
              >
                <h3 className="m-0 text-center fs-6 mt-1">Me</h3>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="Total Tenders"
                        value={
                          BidsisFetching
                            ? "fetching"
                            : errorBidsFetching
                            ? "error fetching"
                            : bids.length
                        }
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<FileDoneOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="Your Active Tenders"
                        value={
                          AcBidsisFetching
                            ? "fetching"
                            : errorAcBidsFetching
                            ? "error fetching"
                            : ACbids.length
                        }
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<CheckCircleOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="Cancelled Tenders"
                        value={
                          CBidsisFetching
                            ? "fetching"
                            : errorCBidsFetching
                            ? "error fetching"
                            : Cbids.length
                        }
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<CloseCircleOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="Closed Tenders"
                        value={
                          ClBidsisFetching
                            ? "fetching"
                            : errorClBidsFetching
                            ? "error fetching"
                            : Clbids.length
                        }
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
                        value={JSON.parse(localStorage.getItem("user")).status}
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
  );
}
