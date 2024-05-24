import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Hook/UseUserContenxt";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [logedIn, setLogedIn] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://f-commerce-system.onrender.com/user/login",
        formData
      );
      if (response.data.status === "Success") {
        alert("Login successful " + response.data.data.username);
        setUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      alert("Server error");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "moderator") {
        navigate("/moderator");
      }
    } else {
      setLogedIn(false);
    }
  }, [navigate]);

  return (
    <div>
      {!logedIn && (
        <>
          <h1>Login</h1>
          <div className="row justify-content-center text-left">
            <div className="col-md-5">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email or Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email or username"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
