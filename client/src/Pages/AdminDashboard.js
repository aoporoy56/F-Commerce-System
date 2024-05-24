import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container card-wrapper mt-5">
      <div className="header">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="row my-row row-cols-1 row-cols-md-2 row-cols-lg-3 g-5 justify-content-center">
        {/* Customer List Card */}
        <div className="col-md-4">
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
        {/* Product Add Card */}
        <div className="col-md-4">
          <Link to="/add-product">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-plus"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Add Product</h5>
                <p className="card-text">Add new products to your inventory</p>
                <div className="d-flex justify-content-center">
                  <p className="button">Add Product</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* Order List Card */}
        <div className="col-md-4">
          <Link to="/order-list">
            <div className="card my-card">
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
        {/* Account Card */}
        {/* <div className="col-md-4">
          <Link to="/account">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-cog"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Account</h5>
                <p className="card-text">View and manage account settings</p>
                <div className="d-flex justify-content-center">
                  <p className="button">Account Settings</p>
                </div>
              </div>
            </div>
          </Link>
        </div> */}
        {/* User List Card */}
        <div className="col-md-4">
          <Link to="/user-list">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">User List</h5>
                <p className="card-text">View and manage user accounts</p>
                <div className="d-flex justify-content-center">
                  <p className="button">View Users</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
        {/* Product List Card */}
        <div className="col-md-4">
          <Link to="/product-list">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-box"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Product List</h5>
                <p className="card-text">View and manage product</p>
                <div className="d-flex justify-content-center">
                  <p className="button">View Products</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Logout Card */}
        <div className="col-md-4">
          <Link to="/logout">
            <div className="card my-card">
              <div className="card-body">
                <div className="circle-wrapper">
                  <div className="circle-outer">
                    <div className="circle">
                      <i className="fas fa-sign-out-alt"></i>
                    </div>
                  </div>
                </div>
                <h5 className="card-title">Logout</h5>
                <p className="card-text">Logout from your account</p>
                <div className="d-flex justify-content-center">
                  <p className="button">Logout</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
