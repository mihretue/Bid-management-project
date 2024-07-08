import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StickyHeadTable from "../../../components/mui_table/index";
import { BsArrowLeft } from "react-icons/bs";
import Footer from "../../../components/footer";

function Allbids() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState({ fetch: "" });

  const columns = [
    {
      index: "id",
      label: "Procurement ID.",
      align: "center",
    },
    { index: "title", label: "Procurement Title", align: "center" },
    {
      index: "cat",
      label: "Procurement Category",
      align: "center",
    },
    {
      index: "app",
      label: "Market Approach",
      align: "center",
    },
    {
      index: "dead",
      label: "Submission Deadline",
      align: "center",
    },
    {
      index: "status",
      label: "Status",
      align: "center",
    },
  ];

  const fetchBids = () => {
    setStatus({ ...status, fetch: "fetching" });
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
        setRows(res);
        setStatus({ ...status, fetch: "success" });
      })
      .catch((err) => {
        setStatus({ ...status, fetch: "error" });
      });
  };

  useEffect(() => {
    fetchBids();
  }, []);

  return (
    <>
      <div className="container p-2 w-100 fluid" style={{ minHeight: "2rem" }}>
        <a className="icon-link text-decoration-none text-black">
          <BsArrowLeft className="me-2" />
          <Link className="text-decoration-none" to={`/userpage/phead/${id}`}>
            Back to Dashboard
          </Link>
        </a>
      </div>
      <div id="advertss" className="mb-5">
        <h1 className="text-center fs-4 text-success "> All Tenders</h1>
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
            title="All Tenders List"
            searchParam="title"
            status={status}
            setStatus={setStatus}
            rows={rows}
            setRows={setRows}
            fetcher={fetchBids}
            itemNavigator={""}
            columns={columns}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Allbids;
