import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Statistic } from "antd";
import {
  UserOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Pane, Tablist, Tab } from "evergreen-ui";
import { IoBan } from "react-icons/io5";
import { RiLoaderLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { RiUserStarLine } from "react-icons/ri";

export default function SidebarTabsExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const tabs = React.useMemo(() => ["Manage User Accounts", "Analytics"], []);
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const [ApisFetching, setApIsFetching] = useState(false);
  const [AperrorFetching, setApErrorFetching] = useState(false);
  const [BisFetching, setBIsFetching] = useState(false);
  const [BerrorFetching, setBErrorFetching] = useState(false);
  const [AisFetching, setAIsFetching] = useState(false);
  const [AerrorFetching, setAErrorFetching] = useState(false);
  const [Aplength, setApLength] = useState(0);
  const [Blength, setBLength] = useState(0);
  const [length, setLength] = useState(0);
  const [Alength, setALength] = useState(0);
  const navigate = useNavigate();

  const fetchAccounts = () => {
    setIsFetching(true);
    fetch("http://localhost:3001/getusers")
      .then((res) => res.json())
      .then((res) => {
        res = res.filter((r) => r.role !== "ppa it officer");
        setLength(res.length);
        setIsFetching(false);
      })
      .catch((err) => {
        setErrorFetching(true);
      });
  };

  const fetchApprovedAccounts = () => {
    setApIsFetching(true);
    fetch("http://localhost:3001/getusers/not-approved")
      .then((res) => res.json())
      .then((res) => {
        setApLength(res.length);
        setApIsFetching(false);
      })
      .catch((err) => {
        setApErrorFetching(true);
      });
  };

  const fetchBannedAccounts = () => {
    setBIsFetching(true);
    fetch("http://localhost:3001/getusers/banned")
      .then((res) => res.json())
      .then((res) => {
        setBLength(res.length);
        setBIsFetching(false);
      })
      .catch((err) => {
        setBErrorFetching(true);
      });
  };

  const fetchActiveAccounts = () => {
    setAIsFetching(true);
    fetch("http://localhost:3001/getusers/active")
      .then((res) => res.json())
      .then((res) => {
        res = res.filter((r) => r.role !== "ppa it officer");
        setALength(res.length);
        setAIsFetching(false);
      })
      .catch((err) => {
        setAErrorFetching(true);
      });
  };

  useEffect(() => {
    fetchAccounts();
    fetchActiveAccounts();
    fetchBannedAccounts();
    fetchApprovedAccounts();
  }, []);

  return (
    <Pane
      className="row rounded border container mb-5 mx-auto shadow p-3 pb-5"
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
            >
              {tab}
            </Tab>
          );
        })}
        <div
          className="d-none d-md-flex flex-column justify-content-center align-items-center"
          style={{ marginTop: "15rem", height: "5rem" }}
        >
          <h6 className="text-center">
            {JSON.parse(localStorage.getItem("user")).name}
          </h6>
          <p className="fs-9 m-0 text-break text-center">
            {JSON.parse(localStorage.getItem("user")).email}
          </p>
          <p className="fs-9 m-0 text-break text-center fw-bold">
            PPA IT Officer
          </p>
        </div>
      </Tablist>

      <Pane className="col-md-9 col-12 " style={{ height: "auto" }}>
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? "inline-block" : "none"}
            key={tab}
            role="tabpanel"
            className="container-fluid"
          >
            {tab == "Manage User Accounts" ? (
              <div
                className="w-100"
                style={{ minHeight: "10rem", height: "auto" }}
              >
                <h3 className="m-0 text-center gx-2 pt-3 fs-6">
                  Manage User Accounts
                </h3>
                <div
                  className="row container-fluid my-3 mx-auto"
                  style={{ cursor: "pointer" }}
                >
                  <div
                    onClick={() => {
                      navigate(`./manage-accounts`);
                    }}
                    className="col-6 d-flex flex-column align-items-center justify-content-center"
                  >
                    <FaUsers
                      color="green"
                      style={{ width: "4rem", height: "4rem" }}
                    />
                    <p className="m-0 fs-5 text-center">All users</p>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`./active-accounts`);
                    }}
                    style={{ cursor: "pointer" }}
                    className="col-6 d-flex flex-column align-items-center justify-content-center"
                  >
                    <RiUserStarLine
                      color="brown"
                      style={{ width: "4rem", height: "4rem" }}
                    />
                    <p className="m-0 fs-5 text-center">Active users</p>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`./approval-requests`);
                    }}
                    style={{ cursor: "pointer" }}
                    className="col-6 ms-auto mt-3 ms-md-0 d-flex flex-column align-items-center justify-content-center"
                  >
                    <RiLoaderLine
                      color="darkslategray"
                      style={{ width: "4rem", height: "4rem" }}
                    />
                    <p className="m-0 fs-5 text-center">Waiting For Approval</p>
                  </div>
                  <div
                    onClick={() => {
                      navigate(`./banned-accounts`);
                    }}
                    style={{ cursor: "pointer" }}
                    className="col-6 my-md-0 mt-3 d-flex flex-column align-items-center justify-content-center"
                  >
                    <IoBan
                      color="red"
                      style={{ width: "4rem", height: "4rem" }}
                    />
                    <p className="m-0 fs-5 text-center">Banned users</p>
                  </div>
                </div>
              </div>
            ) : tab == "Analytics" ? (
              <div
                className="w-100"
                style={{ minHeight: "10rem", height: "auto" }}
              >
                <h3 className="m-0 text-center fs-6 mt-1">Analytics</h3>
                <Row gutter={16}>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="All Users"
                        value={
                          isFetching
                            ? "fetching"
                            : errorFetching
                            ? "error fetching"
                            : length
                        }
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<UserOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="Active Users"
                        value={
                          AisFetching
                            ? "fetching"
                            : AerrorFetching
                            ? "error fetching"
                            : Alength
                        }
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<UserSwitchOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="Users Waiting For Approval"
                        value={
                          ApisFetching
                            ? "fetching"
                            : AperrorFetching
                            ? "error fetching"
                            : Aplength
                        }
                        valueStyle={{ color: "#3f8600" }}
                        prefix={<UserAddOutlined />}
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card bordered={false}>
                      <Statistic
                        title="Banned Users"
                        value={
                          BisFetching
                            ? "fetching"
                            : BerrorFetching
                            ? "error fetching"
                            : Blength
                        }
                        valueStyle={{ color: "#cf1322" }}
                        prefix={<UserDeleteOutlined />}
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
