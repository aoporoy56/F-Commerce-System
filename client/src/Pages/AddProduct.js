import React, { useState } from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "https://f-commerce-system.onrender.com/product/create",
        {
          name,
          description,
          price,
        }
      );
      alert(response.data.message);
      if (response.data.status === "Success") {
        setName("");
        setDescription("");
        setPrice(0);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
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
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
