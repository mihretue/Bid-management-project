import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar } from "evergreen-ui";
import { BsArrowLeft } from "react-icons/bs";
import { useState, useEffect } from "react";
import { MdAccountCircle } from "react-icons/md";
import Footer from "../../../components/footer";
import { Pane, Dialog, Button } from "evergreen-ui";

const ManageActiveUser = () => {
  const { id, uid } = useParams();
  const [user, setUser] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [errorFetching, setErrorFetching] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setIsFetching(true);
    fetch(`http://localhost:3001/userbyid/${uid}`)
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
        setErrorFetching(true);
        console.log(err);
      });
  };

  const banAccount = (uemail) => {
    fetch(`http://localhost:3001/ban/${uid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.res == "ok") {
          fetch("http://localhost:3001/sendemail", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: uemail,
              subject: "Account Banned - Cheretanet",
              body: "Your cheretanet account is BANNED, you can not access the system for a while, you will receive an email if your email is released. Thanks.",
            }),
          })
            .then((res) => res.json())
            .then(() => {
              navigate(`/userpage/admin/${id}/manage-accounts`);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          document.getElementById("actn_result").innerHTML =
            "Some Error Occurred!";
        }
      })
      .catch((err) => {
        document.getElementById("actn_result").innerHTML =
          "Some Error Occurred!";
      });
  };

  const approveAccount = (uemail) => {
    fetch(`http://localhost:3001/approve/${uid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.res == "ok") {
          fetch("http://localhost:3001/sendemail", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: uemail,
              subject: "Account Approval - Cheretanet",
              body: "Your cheretanet account is approved, you can now access the system. Thanks.",
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              navigate(`/userpage/admin/${id}/manage-accounts`);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          document.getElementById("actn_result").innerHTML =
            "Some Error Occurred!";
        }
      })
      .catch((err) => {
        document.getElementById("actn_result").innerHTML =
          "Some Error Occurred!";
      });
  };

  const releaseAccount = (uemail) => {
    fetch(`http://localhost:3001/release/${uid}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.res == "ok") {
          fetch("http://localhost:3001/sendemail", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              to: uemail,
              subject: "Account Released - Cheretanet",
              body: "Your cheretanet account is released from banned state, you can not access the system. Thanks.",
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              navigate(`/userpage/admin/${id}/manage-accounts`);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          document.getElementById("actn_result").innerHTML =
            "Some Error Occurred!";
        }
      })
      .catch((err) => {
        document.getElementById("actn_result").innerHTML =
          "Some Error Occurred!";
      });
  };

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
              to={`/userpage/admin/${id}/manage-accounts/`}
            >
              Back to Manage User Accounts
            </Link>
          </a>
        </div>
        <div className="container rounded my-2" style={{ height: "auto" }}>
          <h4 className="text-center">User Details</h4>
          <hr />
          <div className="mx-auto" style={{ width: "4rem", height: "4rem" }}>
            <MdAccountCircle
              color="brown"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          {isFetching ? (
            <p className="text-center mt-3">Fetching User Information...</p>
          ) : errorFetching ? (
            "Error"
          ) : (
            <>
              <table class="table mx-auto" style={{ width: "70%" }}>
                <tbody>
                  <tr className="text-center">
                    <td className="text-center border-0" colspan="2">
                      First Name
                    </td>
                    <td className="text-center fw-bold float-end border-0">
                      {user.fName}
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className=" border-0" colspan="2">
                      Last Name
                    </td>
                    <td className="float-end fw-bold border-0">{user.lName}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-0" colspan="2">
                      User Name
                    </td>
                    <td className="float-end fw-bold border-0">{user.uName}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-0" colspan="2">
                      Email Address
                    </td>
                    <td className="float-end fw-bold border-0">{user.email}</td>
                  </tr>
                  <tr className="text-center">
                    <td className=" border-0" colspan="2">
                      Role
                    </td>
                    <td className="float-end fw-bold border-0">{user.role}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-0" colspan="2">
                      Birthday
                    </td>
                    <td className="float-end fw-bold border-0">{user.bDay}</td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-0" colspan="2">
                      Account Status
                    </td>
                    <td className="float-end fw-bold border-0">
                      {user.status}
                    </td>
                  </tr>
                  <tr className="text-center">
                    <td className="border-0" colspan="2">
                      Registered On
                    </td>
                    <td className="float-end fw-bold border-0">
                      {user.status}
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div>
                {user.status == "active" && (
                  <p className="text-center">
                    Account Status :{" "}
                    <p className="m-0 fw-bold d-inline text-success">Active</p>
                  </p>
                )}
                {user.status == "banned" && (
                  <p className="text-center">
                    Account Status :{" "}
                    <p className="m-0 fw-bold d-inline text-danger">Banned</p>
                  </p>
                )}
                {user.status == "not-approved" && (
                  <p className="text-center">
                    Account Status :{" "}
                    <p className="m-0 fw-bold d-inline text-primary">
                      Waiting For Approval
                    </p>
                  </p>
                )}
                {user.status == "active" && (
                  <Pane className="mb-1 mx-auto mt-2 d-flex justify-content-center">
                    <Dialog
                      isShown={isShown}
                      title="Confirm Action"
                      onCloseComplete={() => setIsShown(false)}
                      confirmLabel="Confirm"
                      onCancel={() => {
                        setIsShown(false);
                      }}
                      onConfirm={() => {
                        setIsShown(false);
                        banAccount(user.email);
                      }}
                    >
                      Are you sure you want to ban this account?
                    </Dialog>
                    <Button
                      className="bg-danger text-white"
                      onClick={() => setIsShown(true)}
                    >
                      Ban User Account
                    </Button>
                  </Pane>
                )}
                {user.status == "banned" && (
                  <Pane className="mb-1 mx-auto mt-2 d-flex justify-content-center">
                    <Dialog
                      isShown={isShown}
                      title="Confirm Action"
                      onCloseComplete={() => setIsShown(false)}
                      confirmLabel="Confirm"
                      onCancel={() => {
                        setIsShown(false);
                      }}
                      onConfirm={() => {
                        setIsShown(false);
                        releaseAccount(user.email);
                      }}
                    >
                      Are you sure you want to release this account?
                    </Dialog>
                    <Button
                      className="bg-primary text-white"
                      onClick={() => setIsShown(true)}
                    >
                      Release Account
                    </Button>
                  </Pane>
                )}
                {user.status == "not-approved" && (
                  <Pane className="mb-1 mx-auto mt-2 d-flex justify-content-center">
                    <Dialog
                      isShown={isShown}
                      title="Confirm Action"
                      onCloseComplete={() => setIsShown(false)}
                      confirmLabel="Confirm"
                      onCancel={() => {
                        setIsShown(false);
                      }}
                      onConfirm={() => {
                        setIsShown(false);
                        approveAccount(user.email);
                      }}
                    >
                      Are you sure you want to approve this account?
                    </Dialog>
                    <Button
                      className="bg-primary text-white"
                      onClick={() => setIsShown(true)}
                    >
                      Approve Account
                    </Button>
                  </Pane>
                )}
                <p
                  className="text-center mx-0 mt-0 mb-3 text-danger"
                  id="actn_result"
                ></p>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ManageActiveUser;
