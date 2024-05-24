import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Table } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://f-commerce-system.onrender.com/user"
        );
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [showModal]);

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(
        `https://f-commerce-system.onrender.com/user/status/${selectedUser._id}`,
        {
          status: selectedUser.status === "active" ? "inactive" : "active",
        }
      );
      if (response.data.status === "Success") {
        alert("User status updated successfully");
      } else {
        alert(response.data.message);
      }
      handleCloseModal();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                {user.status === "active" ? (
                  <Button variant="danger" onClick={() => handleViewUser(user)}>
                    Deactivate
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleViewUser(user)}
                  >
                    Activate
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* User Modal */}
      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Change User Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to change the status of{" "}
              <strong>{selectedUser.username}</strong> to{" "}
              <strong>
                {selectedUser.status === "active" ? "inactive" : "active"}
              </strong>
              ?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleStatusChange}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UserList;
