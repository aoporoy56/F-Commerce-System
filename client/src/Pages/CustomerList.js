import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Fetch the list of customers from your backend API
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://f-commerce-system.onrender.com/customer"
        );
        setCustomers(response.data); // Assuming the API response contains an array of customer objects
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, [showModal]);

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setName(customer.name);
    setNumber(customer.number);
    setAddress(customer.address);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setName("");
    setAddress("");
    setNumber("");
    setShowModal(false);
  };

  const handleEditCustomer = async () => {
    try {
      const response = await axios.put(
        `https://f-commerce-system.onrender.com/customer/${selectedCustomer._id}`,
        {
          name,
          number,
          address,
        }
      );
      alert(response.data.message);

      handleCloseModal();
    } catch (error) {
      console.error("Error updating customer:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="container mt-5">
      <h2>Customer List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.number}</td>
              <td>{customer.address}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewCustomer(customer)}
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Customer Modal */}
      {selectedCustomer && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>View/Edit Customer Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditCustomer}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default CustomerList;
