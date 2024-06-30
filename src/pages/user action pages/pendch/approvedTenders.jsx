import React from "react";
import { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Footer from "../../../components/footer";
import StickyHeadTable from "../../../components/mui_table/index";

const ApprovedTenders = () => {
  useEffect(() => {
    document.title = "Cheretanet | Approve Requiest";
  });

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

  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState({ fetch: "" });

  const fetchBids = () => {
    setStatus({ ...status, fetch: "fetching" });
    let q = {
      pBody: JSON.parse(localStorage.getItem("user")).pBody,
      approved: true,
    };
    q = new URLSearchParams(q);
    fetch(`http://localhost:3001/tenderbypropp?${q}`)
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
      <div
        className="mb-5 container border rounded"
        style={{ minHeight: "20rem", height: "auto" }}
      >
        <div className="p-2 w-100 fluid" style={{ minHeight: "2rem" }}>
          <a className="icon-link text-decoration-none text-black">
            <BsArrowLeft className="me-2" />
            <Link
              className="text-decoration-none"
              to={`/userpage/pendch/${id}`}
            >
              Back to Manage Bids
            </Link>
          </a>
        </div>
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
            title="Approved Tenders"
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
};

export default ApprovedTenders;
