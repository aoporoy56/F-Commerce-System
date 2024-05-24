const mongoose = require('mongoose');
const Customer = require('../models/CustomerModel');
const {SuccessResponse} = require("../Config/SuccessResponse")
exports.allCustomer = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json(SuccessResponse(200, "All customers", customers, null));
    }
}

exports.createCustomer = async (req, res) => {
    const alreadyExists = await Customer.findOne({ number: req.body.number });
    if (alreadyExists) {
        return res
          .status(200)
          .json(
            SuccessResponse(200, "Customer already exists", alreadyExists, null)
          );
    }
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(SuccessResponse(201, "Customer created", customer, null));
    } catch (error) {
        res.status(400).json(SuccessResponse(200, "Error", null, error.message)); 
    }
}
exports.getCustomer = async (req, res) => {
    try {
        const Customer = mongoose.model('Customer');
        const customer = await Customer.find({ _id: req.params.id });
        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
exports.updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, number, address } = req.body;
        const findCustomer = await Customer.findById(id);
        if (!findCustomer) {
            return res.status(404).json(SuccessResponse("Failed", "Customer not found", null, null));
        }
        const updateCustomer = await Customer.findByIdAndUpdate(id, { name, number, address }, { new: true });
        res.status(200).json(SuccessResponse(200, "Customer updated", updateCustomer, null));
    }
    catch (error) {
        res.status(400).json(SuccessResponse(200, "Error", null, error.message));
    }
}
exports.totalCustomers = async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        res.status(200).json(SuccessResponse(200, "Total Customers", totalCustomers, null));
    } catch (error) {
        res.status(500).json(SuccessResponse(500, "Internal server error", null, error.message));
    }
}


exports.last5Customer = async (req, res) => {
    try {
        const lastCustomers = await Customer.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json(SuccessResponse(200, "Last 5 Customers", lastCustomers, null));
    } catch (error) {
        res.status(500).json(SuccessResponse(500, "Internal server error", null, error.message));
    }
};