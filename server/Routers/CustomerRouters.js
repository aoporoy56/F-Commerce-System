const express = require("express");
const { allCustomer, createCustomer, getCustomer, updateCustomer, totalCustomers, last5Customer } = require("../Controller/CustomerController");
const CustomerRouter = express.Router();

CustomerRouter.get("/", allCustomer);
// CustomerRouter.get("/:id", getCustomer);
CustomerRouter.post("/", createCustomer);
CustomerRouter.put("/:id", updateCustomer);
// CustomerRouter.delete("/:id", deleteCustomer);
CustomerRouter.get("/totalcustomers", totalCustomers);
CustomerRouter.get("/last5Customer", last5Customer);

exports.CustomerRouter = CustomerRouter;