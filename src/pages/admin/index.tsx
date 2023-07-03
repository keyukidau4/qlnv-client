import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/store/user";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../redux/store";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //logout start
  const handlerLogout = async () => {
    const values: string = "";
    await axios
      .post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/logout`,
        { values },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.data.code === 200) {
          toast.success(response.data.message, {
            position: "top-left",
          });
          dispatch(logout());
          navigate("/login");
        } else {
          toast.error("Logout Error");
        }
      })
      .catch((error) => {
        console.log({ error });

        toast.error(error.message);
      });
  };
  //logout end
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand">Navbar</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Link
                </Link>
              </li>
            </ul>
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-success "
                type="button"
                onClick={handlerLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <h1>Home Page</h1>
    </div>
  );
};

export default AdminDashboard;
