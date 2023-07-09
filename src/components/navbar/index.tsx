import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../../service/auth";

// type Props = {
//   handlerLogout: React.MouseEventHandler<HTMLButtonElement>;
// };

type Props = {
  home: string;
  list: Array<string>;
};

const Navbar = ({ home, list }: Props) => {
  const { handlerLogout } = AuthService();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href={home}>
          Home
        </a>
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
            {list.map((l, index) => (
              <li key={index} className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={`/admin-dashboard/${l}`}
                >
                  {l}
                </Link>
              </li>
            ))}

            <li className="nav-item">
              <Link className="nav-link" to="#">
                Link
              </Link>
            </li>
          </ul>
          <div className="d-flex justify-content-between">
            <Link to={"/login"} className="d-none">
              <button className="btn btn-outline-primary d-none" type="button">
                Login
              </button>
            </Link>
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
  );
};

export default Navbar;
