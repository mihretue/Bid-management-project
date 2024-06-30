import Footer from "../../components/footer";
import StickyHeadTable from "../../components/mui_table/index";
import { useEffect, useState } from "react";
const BidAwards = () => {
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

  useEffect(() => {
    document.title = "Cheretanet | Bid Awards";
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      fetchBids();
    } else {
      fetchBidsPublicUser();
    }
  }, []);

  const fetchBids = () => {
    setStatus({ ...status, fetch: "fetching" });
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
        setRows(res);
        setStatus({ ...status, fetch: "success" });
      })
      .catch((err) => {
        setStatus({ ...status, fetch: "error" });
      });
  };

  const fetchBidsPublicUser = () => {
    setStatus({ ...status, fetch: "fetching" });
    fetch("http://localhost:3001/getbidsPU/closed")
      .then((res) => res.json())
      .then((res) => {
        setRows(res);
        setStatus({ ...status, fetch: "success" });
      })
      .catch((err) => {
        setStatus({ ...status, fetch: "error" });
      });
  };

  return (
    <>
      <div className="container mb-5">
        <h1 className="text-center">Bid Awards</h1>
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
            title="Bid Awards List"
            searchParam="title"
            status={status}
            setStatus={setStatus}
            rows={rows}
            setRows={setRows}
            fetcher={
              localStorage.getItem("user") ? fetchBids : fetchBidsPublicUser
            }
            itemNavigator={""}
            columns={columns}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BidAwards;
