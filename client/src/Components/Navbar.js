import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light mb-5">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="./logo.svg" alt="logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            style={{ flexGrow: "inherit" }}
            id="navbarNav"
          >
            <ul className="navbar-nav align-items-center">
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/moderator">
                  Moderator
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="/moderator">
                  Customer
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/moderator">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/moderator">
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/moderator">
                  User
                </Link>
              </li>
              <li className="nav-item me-3">
                <Link
                  className="nav-link d-flex align-items-center "
                  to="/signup"
                >
                  <img src="./02.svg" alt="user" />
                  <label className="ms-2">Signup</label>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link d-flex align-items-center login-btn"
                  to="/login"
                >
                  <img src="./01.svg" alt="user" />
                  <label className="ms-2">Login</label>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/asdf">
                  404
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
