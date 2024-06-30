import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
// import StickyHeadTable from "../../../components/Approval Req Table";
import StickyHeadTable from "../../../components/mui_table";
const ApprovalRequests = () => {
  const { id } = useParams();
  const [status, setStatus] = useState({ fetch: "" });
  const [rows, setRows] = useState([]);

  const columns = [
    {
      index: "user-name",
      label: "Name",
      align: "center",
    },
    { index: "email", label: "Email", align: "center" },
    {
      index: "uName",
      label: "User Name",
      align: "center",
    },
    {
      index: "bDay",
      label: "Birthday",
      align: "center",
    },
    {
      index: "role",
      label: "Role",
      align: "center",
    },
    {
      index: "status",
      label: "Status",
      align: "center",
    },
    {
      index: "regTime",
      label: "Request Time",
      align: "center",
    },
  ];

  const fetchAccounts = () => {
    setStatus({ ...status, fetch: "fetching" });
    fetch("http://localhost:3001/getusers/not-approved")
      .then((res) => res.json())
      .then((res) => {
        setRows(res);
        setStatus({ ...status, fetch: "success" });
      })
      .catch((err) => {
        setRows([]);
        setErrorFetching(true);
        setStatus({ ...status, fetch: "error" });
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div
      className="container mb-5 border rounded"
      style={{ minHeight: "20rem", height: "auto" }}
    >
      <div className="p-2 w-100 fluid" style={{ minHeight: "2rem" }}>
        <a className="icon-link text-decoration-none text-black">
          <BsArrowLeft className="me-2" />
          <Link className="text-decoration-none" to={`/userpage/admin/${id}`}>
            Back to Dashboard
          </Link>
        </a>
      </div>
      <div className="container" style={{ height: "auto" }}>
        <h4 className="text-center my-2">Users Waiting For Approval</h4>
        <div>
          <div
            className=" bg-body-tertiary rounded shadow mt-3 border border-info rounded"
            style={{
              maxWidth: "100%",
              height: "auto",
              minHeight: "3rem",
              backgroundColor: "white",
            }}
          >
            <StickyHeadTable
              title="Users List"
              searchParam="user-name"
              status={status}
              setStatus={setStatus}
              rows={rows}
              setRows={setRows}
              fetcher={fetchAccounts}
              itemNavigator={""}
              columns={columns}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ApprovalRequests;
