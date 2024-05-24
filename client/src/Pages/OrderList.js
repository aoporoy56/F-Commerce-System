import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal } from "react-bootstrap";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://f-commerce-system.onrender.com/order"
      );
      setOrders(response.data.data); // Assuming the API response contains an array of order objects
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    console.log(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = async (e, order) => {
    try {
      const updateStatus = axios.put(
        `https://f-commerce-system.onrender.com/order/${order._id}`,
        {
          status: e.target.value,
        }
      );
      updateStatus.then((res) => {
        fetchOrders();
        alert(res.data.message);
        console.log(res.data);
      });
    } catch (error) {
      alert("Updating order status Failed");
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Order List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Number</th>
            <th>Total Bill</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customer.name}</td>
              <td>{order.customer.number}</td>
              <td>{order.totalBill}</td>
              <td>
                <select
                  className={`form-select ${
                    order.status === "Delivered"
                      ? "bg-success"
                      : order.status === "Processing"
                      ? "bg-primary"
                      : order.status === "Cancelled"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}
                  value={order.status}
                  onChange={(event) => handleChange(event, order)}
                  aria-label="Order Status"
                >
                  <option value="">Select Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Processing">Processing</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Pending">Pending</option>
                </select>
              </td>

              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewOrder(order)}
                >
                  View
                </Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Order Modal */}
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>View Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <div>
                <p>Order ID: {selectedOrder._id}</p>
                <p>Customer Name: {selectedOrder.customer.name}</p>
                <p>Customer Number: {selectedOrder.customer.number}</p>
                <p>Customer Address: {selectedOrder.customer.address}</p>
                <p>
                  Status:
                  <span
                    className={
                      "badge " +
                      (selectedOrder.status === "Delivered"
                        ? "bg-success"
                        : selectedOrder.status === "Processing"
                        ? "bg-primary"
                        : selectedOrder.status === "Cancelled"
                        ? "bg-danger"
                        : "bg-warning text-dark")
                    }
                  >
                    {selectedOrder.status}
                  </span>
                </p>
              </div>
            }
            <h4>Order Items</h4>
            <Table striped bordered hover style={{ overflow: "auto" }}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.product.price}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <p>Total Bill: {selectedOrder.totalBill}</p>
            <p>Discount: {selectedOrder.discount}</p>
            <p>Advance: {selectedOrder.advance}</p>
            <p>Due: {selectedOrder.due}</p>
            <p>Special Instruction: {selectedOrder.specialInstruction}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default OrderList;
