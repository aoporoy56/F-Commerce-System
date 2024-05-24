import "./App.css";
import Home from "./Pages/Home";
import ModeratorDashboard from "./Pages/ModeratorDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminDashboard from "./Pages/AdminDashboard";
import { UserContext } from "./Context/UserContext";
import { useEffect, useState } from "react";
import PrivateRoute from "./Hook/PrivateRoute";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import ERROR from "./Pages/ERROR";
import Signup from "./Pages/Signup";
import AddOrder from "./Pages/AddOrder";
import CustomerList from "./Pages/CustomerList";
import OrderList from "./Pages/OrderList";
import AddProduct from "./Pages/AddProduct";
import UserList from "./Pages/UserList";
import ProductList from "./Pages/ProductList";
import Logout from "./Pages/Logout";
import DemoModal from "./Pages/DemoModal";
import Overview from "./Pages/Overview";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const myUser = localStorage.getItem("user");
    setUser(JSON.parse(myUser));
    console.log("User", user);
  },[])
  return (
    <div className="App mb-5">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            {/* only Moderator */}
            <Route
              path="/"
              element={<PrivateRoute role={["moderator", "user"]} />}
            >
              <Route
                path="/moderator"
                role="moderator"
                element={<ModeratorDashboard />}
              />
              <Route path="/add-order" element={<AddOrder />} />
            </Route>

            {/* Only Admin */}
            <Route path="/" element={<PrivateRoute role={"admin"} />}>
              <Route path="/admin" role="admin" element={<AdminDashboard />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/user-list" element={<UserList />} />
            </Route>

            {/* Moderator & Admin */}
            <Route
              path="/"
              element={<PrivateRoute role={["admin", "moderator", "user"]} />}
            >
              <Route path="/product-list" element={<ProductList />} />
              <Route path="/customer-list" element={<CustomerList />} />
              <Route path="/order-list" element={<OrderList />} />
              <Route path="/overview" element={<Overview />} />
            </Route>

            {/* All User */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<DemoModal />} />
            {/* <Route path="*" element={<ERROR />} /> */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
