const mongoose = require('mongoose');
const { SuccessResponse } = require('../Config/SuccessResponse');
const Product = require('../models/ProductModel');


exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const findProduct = await Product.findOne({ name });
        if (!name || !description || !price) {
            return res.status(200).json(SuccessResponse("Failed", "Please fill all fields", null, "Please fill all fields"));
        }
        if (findProduct) {
            return res.status(200).json(SuccessResponse("Failed", "Product already exists", null, "Product already exists"));
        }
        const product = new Product({ name, description, price });
        const result = await product.save();
        res.status(200).json(SuccessResponse("Success", "Product Created", result, null));
    } catch (error) {
        res.status(200).json(SuccessResponse("Failed", "Product not Created", null, error.message));
    }
}

exports.allProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(SuccessResponse("Success", "All Products", products, null));
    } catch (error) {
        res.status(404).json(SuccessResponse("Failed", "Products not Found", null, error));
    }
}   

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(SuccessResponse("Success", "Product Found", product, null));
    } catch (error) {
        res.status(404).json(SuccessResponse("Failed", "Product not Found", null, error));
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const product = await Product.findByIdAndUpdate (req.params.id, req.body, { new: true });
        res.status(200).json(SuccessResponse("Success", "Product Updated", product, null));
    }
    catch (error) {
        res.status(400).json(SuccessResponse("Failed", "Product not Updated", null, error));
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json(SuccessResponse("Failed", "Product not Found", null, "Product not found"));
        }
        res.status(200).json(SuccessResponse("Success", "Product Deleted", product, null));
    }
    catch (error) {
        res.status(400).json(SuccessResponse("Failed", "Product not Deleted", null, error));
    }
}