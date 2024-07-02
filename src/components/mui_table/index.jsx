import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { BiError } from "react-icons/bi";
import Button from "@mui/material/Button";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { GrRefresh } from "react-icons/gr";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { AiOutlineSearch } from "react-icons/ai";
import { renderStatus } from "../../services/renderStatus";

export default function StickyHeadTable({
  title,
  status,
  rows,
  setRows,
  fetcher,
  setStatus,
  itemNavigator,
  loader,
  searchParam,
  columns,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const init = rows;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const searchItem = (q) => {
    let filt = [];
    if (q != "") {
      filt = init.filter((item) => {
        const searchBy =
          searchParam == "user-name"
            ? item.fName.toLowerCase() + " " + item.lName.toLowerCase()
            : searchParam.toLowerCase();
        return searchBy.includes(q.toLowerCase());
      });
      setRows(filt);
    } else setRows(init);
  };

  const refreshButton = (label) => {
    return (
      <Button
        className="ms-auto m-1 d-flex"
        variant="contained"
        startIcon={<GrRefresh />}
        style={{ textTransform: "none" }}
        onClick={() => {
          fetcher();
          setStatus({ ...status, fetch: "fetching" });
        }}
      >
        {label || "Refresh"}
      </Button>
    );
  };

  return status.fetch == "fetching" ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="p-5"
    >
      {loader ? loader : <CircularProgress size="1.5rem" color="secondary" />}
      <p
        style={{
          fontFamily:
            "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
          margin: "0",
          textAlign: "center",
        }}
      >
        {title ? `Fetching ${title}...` : "Fetching Data..."}
      </p>
    </div>
  ) : status.fetch == "error" ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="p-5"
    >
      <BiError size="1.5rem" />
      <p
        style={{
          fontFamily:
            "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
          margin: "0",
          textAlign: "center",
          color: "red",
        }}
      >
        An Error Occurred!
      </p>

      <Button
        variant="contained"
        startIcon={<GrRefresh />}
        style={{ textTransform: "none" }}
        onClick={() => {
          fetcher();
          setStatus({ ...status, fetch: "fetching" });
        }}
      >
        Try Again
      </Button>
    </div>
  ) : rows.length > 0 ? (
    <>
      <div
        className="mt-3 rounded border mx-auto"
        style={{ width: "90%", height: "auto", minHeight: "2.5rem" }}
      >
        <TextField
          placeholder="Search"
          id="outlined-start-adornment"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AiOutlineSearch />
              </InputAdornment>
            ),
          }}
          style={{ width: "100%" }}
          onChange={(e) => searchItem(e.target.value)}
        />
      </div>
      {refreshButton()}
      <Paper sx={{ maxWidth: "100%", overflow: "hidden", padding: "5px" }}>
        <TableContainer sx={{ height: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="border-success">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.index}
                    align={column.align}
                    className=" "
                    style={{
                      fontWeight: "bold",
                      fontFamily:
                        "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => {
                return (
                  <TableRow
                    onClick={() => {
                      navigate(`./${row._id}`);
                      //use itemnavigator for other cases here
                    }}
                    style={{
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      minHeight: "1rem",
                    }}
                    key={row.id}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {columns.map((column) => {
                      const data =
                        column.index == "user-name"
                          ? row.fName + " " + row.lName
                          : row[column.index];

                      return (
                        <TableCell
                          style={{
                            fontFamily:
                              "Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
                            fontSize: "inherit",
                          }}
                          align={"center"}
                        >
                          {column.index == "status" ? renderStatus(data) : data}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  ) : (
    <>
      <div
        className="mt-3 rounded border mx-auto"
        style={{ width: "90%", height: "auto", minHeight: "2.5rem" }}
      >
        <TextField
          placeholder="Search"
          id="outlined-start-adornment"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AiOutlineSearch />
              </InputAdornment>
            ),
          }}
          style={{ width: "100%" }}
          disabled
        />
      </div>

      <div>
        {refreshButton()}
        <p className="pb-5 m-0 text-center pt-2 fs-6">No Data!</p>
      </div>
    </>
  );
}
