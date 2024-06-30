import { useEffect, useState } from "react";
import StickyHeadTable from "../../components/mui_table/index";
import Footer from "../../components/footer";
const Tenders = () => {
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
    document.title = "Cheretanet | Tenders";
  });

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = () => {
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
        setRows(res);
        setStatus({ ...status, fetch: "success" });
      })
      .catch((err) => {
        setStatus({ ...status, fetch: "error" });
      });
  };

  return (
    <>
      <div id="advertss" className="mb-5">
        <h1 className="text-center">Tenders</h1>
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
            title="Tenders List"
            searchParam="title"
            status={status}
            setStatus={setStatus}
            rows={rows}
            setRows={setRows}
            fetcher={fetchTenders}
            itemNavigator={""}
            columns={columns}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tenders;
