import React from "react";
import { Link } from "react-router-dom";

export default function ModeratorDashboard() {
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <div className="container card-wrapper mt-5">
      <div className="header">
        <h1>Moderator Dashboard</h1>
      </div>

      <div className="row my-row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 justify-content-center">
        {/* Overview Page */}
        <div className="col-md-3">
          <Link to="/overview">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-chart-line"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Overview</h5>
                <p className="card-text">View system overview</p>
                <div className="d-flex justify-content-center">
                  <p className="button">View Overview</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* Customer List Card */}
        <div className="col-md-3">
          <Link to="/customer-list">
            <div className="card  my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-users"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Customer List</h5>
                <p className="card-text">View and manage customer data</p>
                <div className="d-flex justify-content-center">
                  <p className="button">View Customers</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* Order List */}
        <div className="col-md-3">
          <Link to="/order-list">
            <div className="card   my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-list"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Order List</h5>
                <p className="card-text">View and manage orders</p>
                <div className="d-flex justify-content-center">
                  <p className="button">View Orders</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* Add Order */}
        <div className="col-md-3">
          <Link to="/add-order">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Add Order</h5>
                <p className="card-text">Add new order to the system</p>
                <div className="d-flex justify-content-center">
                  <p className="button">Add Order</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <div className="col-md-3">
          <Link to="/product-list">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-list"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Product List</h5>
                <p className="card-text">View and manage products</p>
                <div className="d-flex justify-content-center">
                  <p className="button">View Products</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* Logout */}
        <div className="col-md-3">
          <div className="card my-card" onClick={handleLogout}>
            <div className="card-body">
              <div className="circle-wrapper">
                <div className="circle-outer">
                  <div className="circle">
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </div>
              </div>
              <h5 className="card-title">Logout</h5>
              <p className="card-text">Logout from the system</p>
              <div className="d-flex justify-content-center">
                <p className="button">Logout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
