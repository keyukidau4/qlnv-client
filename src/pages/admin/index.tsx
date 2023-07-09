import React from "react";
import Navbar from "../../components/navbar";
import { Link } from "react-router-dom";
import "../../styles/common/card.css";

const AdminDashboard: React.FC = () => {
  return (
    <div className="container">
      <Navbar home={"/admin-dashboard"} list={["users"]} />
      <h1>Admin Page</h1>
      <div className="row">
        <div
          className="card card-style col-6 col-sm-4"
          style={{ width: "18rem" }}
        >
          <div className="card-body">
            <h5 className="card-title">User</h5>
            <h6 className="card-subtitle mb-2 text-muted">User CRUD</h6>
            <p className="card-text">link to User manager Table</p>
            <Link to={"/admin-dashboard/users"}>
              <span>{">>>"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
