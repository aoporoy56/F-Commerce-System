import React, { useEffect, useState } from "react";
import { Form, Button, Table, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { useUserContext } from "../Hook/UseUserContenxt";

const AddOrder = () => {
  const { user } = useUserContext();
  const [showInvoice, setShowInvoice] = useState(false); // State to manage modal visibility
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  let [customerId, setCustomerId] = useState("");
  const [product, setProduct] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [total, setTotal] = useState(0);
  const [orderItems, setOrderItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [advance, setAdvance] = useState(0);
  const [due, setDue] = useState(0);
  const [specialInstruction, setSpecialInstruction] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://f-commerce-system.onrender.com/product"
        );
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (event) => {
    const productId = event.target.value;
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    setNewProduct(selectedProduct);
    setProduct(productId);
    products.forEach((product) => {
      if (product._id === selectedProduct._id) {
        setPrice(() => product.price);
        setQuantity("");
        setTotal(0);
      }
    });
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
    setTotal(price * newQuantity);
  };

  const handleDiscountChange = (event) => {
    const newDiscount = parseInt(event.target.value);
    setDiscount(newDiscount);
    setDue(totalBill - newDiscount - advance);
  };

  const handleAdvanceChange = (event) => {
    const newAdvance = parseInt(event.target.value);
    setAdvance(newAdvance);
    setDue(totalBill - discount - newAdvance);
  };

  const handleAddOrderItem = () => {
    const newOrderItem = { newProduct, quantity, price, total };
    if (!newOrderItem.newProduct) {
      alert("Please select a product");
      return;
    }
    if (newOrderItem.quantity <= 0) {
      alert("Quantity should be greater than 0");
      return;
    }
    if (newOrderItem.total <= 0) {
      alert("Total should be greater than 0");
      return;
    }
    if (
      orderItems.some(
        (item) => item.newProduct._id === newOrderItem.newProduct._id
      )
    ) {
      alert("Product already added to order");
      return;
    }
    setOrderItems([...orderItems, newOrderItem]);
    setTotalBill(totalBill + total);
    setDue(totalBill + total - discount - advance);
    setPrice(0);
    setQuantity("");
    setTotal(0);
    setProduct("");
  };

  const handleDeleteOrderItem = (index) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems.splice(index, 1);
    setOrderItems(updatedOrderItems);
    const newTotalBill = updatedOrderItems.reduce(
      (acc, item) => acc + item.total,
      0
    );
    setTotalBill(newTotalBill);
    setDue(newTotalBill - discount - advance);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name || !number || !address) {
      alert("Please fill customer details");
      return;
    }
    if (orderItems.length === 0) {
      alert("Please add order items");
      return;
    }
    try {
      const response = await axios.post(
        "https://f-commerce-system.onrender.com/customer",
        {
          name,
          number,
          address,
        }
      );
      console.log(response.data.data);
      console.log(user);

      customerId = response.data.data._id;

      setCustomerId(customerId);

      const itemsData = orderItems.map((item) => ({
        product: item.newProduct._id,
        productName: item.newProduct.name,
        quantity: item.quantity,
      }));

      const orderPayload = {
        customer: customerId,
        user: "6616ff6764834060612412c6",
        items: itemsData,
        totalBill: totalBill,
        advance: advance,
        due: due,
        specialInstructions: specialInstruction,
      };
      await axios.post(
        "https://f-commerce-system.onrender.com/order/create",
        orderPayload
      );
      alert("Order added successfully");
      setAddress("");
      setName("");
      setNumber("");
      setOrderItems([]);
      setTotalBill(0);
      setDiscount(0);
      setAdvance(0);
      setDue(0);
      setSpecialInstruction("");
    } catch (error) {
      alert("Error adding order");
      console.error("Error adding customer:", error.message);
    }
  };

  const openInvoice = (event) => {
    event.preventDefault();
    if (!name || !number || !address) {
      alert("Please fill customer details");
      return;
    }
    if (orderItems.length === 0) {
      alert("Please add order items");
      return;
    }
    setShowInvoice(true); // Show the invoice modal upon submitting the order
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false); // Close the invoice modal
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-6">
        <h2 className="header">Add Order</h2>
        <Form onSubmit={handleSubmit}>
          {/* Customer Details */}
          <Row>
            <Col>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="number">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>

          {/* Product Details */}
          <Row>
            <Col>
              <Form.Group controlId="product">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  as="select"
                  value={product}
                  onChange={handleProductChange}
                >
                  <option value="">Select Product</option>
                  {products.length > 0 &&
                    products.map((product) => (
                      <option key={product._id} value={product._id}>
                        {product.name}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" value={price} readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="total">
                <Form.Label>Total</Form.Label>
                <Form.Control type="text" value={total} readOnly />
              </Form.Group>
            </Col>
          </Row>

          {/* Add Order Item */}
          <Button variant="primary" type="button" onClick={handleAddOrderItem}>
            Add Item
          </Button>
          <hr />

          {/* Order Items */}
          <h3>Order Items</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
                <th>Delete</th> {/* Add column for delete button */}
              </tr>
            </thead>
            <tbody>
              {orderItems.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">
                    No items added to order
                  </td>
                </tr>
              )}
              {orderItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.newProduct.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.total}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteOrderItem(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Order Summary */}
          <Row>
            <Col>
              <Form.Group controlId="totalBill">
                <Form.Label>Total Bill</Form.Label>
                <Form.Control type="text" value={totalBill} readOnly />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="discount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="text"
                  value={discount}
                  onChange={handleDiscountChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="advance">
                <Form.Label>Advance</Form.Label>
                <Form.Control
                  type="text"
                  value={advance}
                  onChange={handleAdvanceChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="due">
                <Form.Label>Due</Form.Label>
                <Form.Control type="text" value={due} readOnly />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="specialInstruction">
            <Form.Label>Special Instruction</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={specialInstruction}
              onChange={(e) => setSpecialInstruction(e.target.value)}
            />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="me-4">
            Submit Order
          </Button>
          <Button variant="primary" type="button" onClick={openInvoice}>
            Open Invoice
          </Button>
        </Form>
        {
          // Invoice Modal
          showInvoice && (
            <Modal
              show={showInvoice}
              onHide={handleCloseInvoice}
              className={showInvoice ? "" : "d-none"}
            >
              <Modal.Header closeButton>
                <Modal.Title>Invoice</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {/* Customer Info */}
                <h4>Customer Information</h4>
                <p>Name: {name}</p>
                <p>Number: {number}</p>
                <p>Address: {address}</p>

                {/* Order Items */}
                <h4>Order Items</h4>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.newProduct.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td>{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <h4>Total Bill: {totalBill}</h4>
                <h4>Discount: {discount}</h4>
                <h4>Advance: {advance}</h4>
                <h4>Due: {due}</h4>
                <h4>Special Instruction: {specialInstruction}</h4>
                {/* Add other invoice details as needed */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseInvoice}>
                  Close
                </Button>
                <Button variant="primary" onClick={handlePrintInvoice}>
                  Print
                </Button>
              </Modal.Footer>
            </Modal>
          )
        }
      </div>
    </div>
  );
};

export default AddOrder;
