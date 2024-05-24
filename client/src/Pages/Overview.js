import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaShoppingCart,
  FaChartBar,
  FaClipboardCheck,
} from "react-icons/fa"; // Importing icons
import axios from "axios";
import PieChart from "./PieChart";

export default function Overview() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCompleteOrders, setTotalCompleteOrders] = useState(0);
  const [totalPendingOrders, setTotalPendingOrders] = useState(0);
  const [totalCancelledOrders, setTotalCancelledOrders] = useState(0);
  const [totalProcessingOrders, setTotalProcessingOrders] = useState(0);
  const [lastOrders, setLastOrders] = useState([]);
  const [lastCustomer, setLastCustomer] = useState([]);
  const allValue = [
    totalCompleteOrders,
    totalPendingOrders,
    totalCancelledOrders,
    totalProcessingOrders,
  ];
  useEffect(() => {
    // Fetch data from API and update state variables
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://f-commerce-system.onrender.com/order/cal/overview"
        ); // Replace with your API URL
        const data = response.data.data;

        setTotalRevenue(data.totalSales);

        setTotalOrders(data.totalOrders);
        setTotalCompleteOrders(data.totalCompleteOrders);
        setTotalPendingOrders(data.totalPendingOrders);
        setTotalCancelledOrders(data.totalCancelledOrders);
        setTotalProcessingOrders(data.totalProcessingOrders);

        const ordersResponse = await axios.get(
          "https://f-commerce-system.onrender.com/order/cal/getLast5CompleteOrders"
        );
        setLastOrders(ordersResponse.data.data);

        const customerResponse = await axios.get(
          "https://f-commerce-system.onrender.com/customer/totalcustomers"
        );
        setTotalCustomers(customerResponse.data.data);

        const lastCustomerResponse = await axios.get(
          "https://f-commerce-system.onrender.com/customer/last5Customer"
        );
        setLastCustomer(lastCustomerResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const shortenOrderId = (orderId) => {
    return "..." + orderId.slice(-5);
  };

  return (
    <div className="container mt-4">
      <h2>Overview</h2>
      <Row className="row-cols-2 row-cols-lg-4 g-4 mt-4 overview-row">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <FaChartBar size={30} />
              <Card.Title>Total Revenue</Card.Title>
              <Card.Text>{totalRevenue} TK</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <FaUsers size={30} />
              <Card.Title>Total Customers</Card.Title>
              <Card.Text>{totalCustomers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <FaShoppingCart size={30} />
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>{totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <FaClipboardCheck size={30} />
              <Card.Title>Total Complete Orders</Card.Title>
              <Card.Text>{totalCompleteOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col>
          <Card className="text-center">
            <Card.Body>
              <FaClock size={30} />
              <Card.Title>Total Pending Orders</Card.Title>
              <Card.Text>{totalPendingOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <FaBan size={30} />
              <Card.Title>Total Cancelled Orders</Card.Title>
              <Card.Text>{totalCancelledOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <FaCog size={30} />
              <Card.Title>Total Processing Orders</Card.Title>
              <Card.Text>{totalProcessingOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      <Row className="mt-3">
        <div className="col-md-9">
          <Card className="text-center">
            <Card.Body>
              <div className="d-flex align-items-center">
                {/* <FaList size={20} /> */}
                <Card.Title>Last 5 Customer</Card.Title>
              </div>
              <Card.Text>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Number</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastCustomer.map((customer, index) => (
                      <tr key={index}>
                        <td>{customer.name}</td>
                        <td>{customer.number}</td>
                        <td>{customer.address}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3">
          <PieChart allValue={allValue} />
        </div>
      </Row>
      <Row className="mt-3">
        <div className="col-12">
          <Card className="text-center">
            <Card.Body>
              <div className="d-flex align-items-center">
                {/* <FaList size={20} /> */}
                <Card.Title>Last 5 Orders</Card.Title>
              </div>
              <Card.Text>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Address</th>
                      <th>Total Bill</th>
                      <th>Status</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lastOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{shortenOrderId(order._id)}</td>
                        <td>{order.customer.name}</td>
                        <td>{order.customer.address}</td>
                        <td>{order.totalBill} TK</td>
                        <td>{order.status}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </div>
  );
}
