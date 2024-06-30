import React, { Component, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import StickyHeadTable from "../../../components/mui_table/index";
import Footer from "../../../components/footer";
import { BsArrowLeft } from "react-icons/bs";

function BidProps() {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState({ fetch: "" });

  const columns = [
    {
      index: "bidderName",
      label: "Applicant Name",
      align: "center",
    },
    { index: "bidSecPayment", label: "Bid Security Payment", align: "center" },
    {
      index: "appTime",
      label: "Application Time ",
      align: "center",
    },
    {
      index: "bidderStatus",
      label: "Bidder Status",
      align: "center",
    },
  ];

  const fetchBidding = (bids) => {
    fetch("http://localhost:3001/getbiddingall")
      .then((res) => res.json())
      .then((res) => {
        console.log('res',res);
        setRows(
          res.filter((r) => {
            return bids.some((bidItem) => bidItem._id == r.bidId);
          })
        );
        setStatus({ ...status, fetch: "success" });
      })
      .catch((err) => {
        setStatus({ ...status, fetch: "error" });
      });
  };

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
        fetchBidding(res);
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
          <Link
            className="text-decoration-none"
            to={`/userpage/phead/${id}/manage-bids/all-bids/`}
          >
            Back to All Bids
          </Link>
        </a>
      </div>
      <div id="advertss" className="mb-5">
        <h1 className="text-center fs-4 text-success ">Bid Proposals</h1>
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
            title="Bir Proposals"
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
export default BidProps;
