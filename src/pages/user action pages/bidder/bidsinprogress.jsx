import { useParams, Link } from "react-router-dom";
import Footer from "../../../components/footer";
import { BsArrowLeft } from "react-icons/bs";
import { useState, useEffect } from "react";
import StickyHeadTable from "../../../components/mui_table/index";
const BidsInProgress = () => {
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

  const fetchBidding = (bids) => {
    let q = { id: id };
    q = new URLSearchParams(q);

    fetch(`http://localhost:3001/getbidding/?${q}`)
      .then((res) => res.json())
      .then((res) => {
        const finalRes = res.filter((bIt) => {
          return bIt.bidderStatus == "bidding";
        });

        setRows(
          bids.filter((bid) => {
            return finalRes.some((biddingItem) => biddingItem.bidId == bid._id);
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
    fetch("http://localhost:3001/gettenders", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sortBy: "Title" }),
    })
      .then((res) => res.json())
      .then((res) => {
        let finalRes = res.filter((rs) => {
          return rs.status == "active";
        });
        fetchBidding(finalRes);
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
        className="container mb-5 border rounded"
        style={{ minHeight: "20rem", height: "auto" }}
      >
        <div className="p-2 w-100 fluid" style={{ minHeight: "2rem" }}>
          <a className="icon-link text-decoration-none text-black">
            <BsArrowLeft className="me-2" />
            <Link
              className="text-decoration-none"
              to={`/userpage/supplier/${id}`}
            >
              Back to Manage Bids
            </Link>
          </a>
        </div>
        <h2 className="text-center">Bids In Progress</h2>
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
            title="Bids in Progress"
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

export default BidsInProgress;
