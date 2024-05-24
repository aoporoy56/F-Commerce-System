import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
export default function Home() {
    const navigate = useNavigate();
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "moderator") {
          navigate("/moderator");
        }
      } else {
        navigate("/login");
      }
    }, []); 
  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <h1>Home</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
