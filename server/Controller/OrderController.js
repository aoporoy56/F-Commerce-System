const mongoose = require("mongoose");
const { SuccessResponse } = require("../Config/SuccessResponse");
const Order = require("../models/OrderModel");

exports.createOrder = async (req, res) => {
  try {
    const {
      customer,
      user,
      items,
      totalBill,
      advance,
      due,
      specialInstructions,
    } = req.body;
    for (let i = 0; i < items.length; i++) {
      const product = await mongoose.model("Product").findById(items[i].product);
      items[i].total = product.price * items[i].quantity;
    }
    const order = new Order({
      customer,
      user,
      items,
      totalBill,
      advance,
      due,
      specialInstructions,
    });
    await order.save();
    res
      .status(201)
      .json(SuccessResponse(200, "Order created successfully", order, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("customer").populate("user").populate("items.product");
    res.status(200).json(SuccessResponse(200, "All orders", orders, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};

exports.orderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("customer").populate("items.product");
    if (!order) {
      return res
        .status(404)
        .json(SuccessResponse(404, "Order not found", null, null));
    }
    res.status(200).json(SuccessResponse(200, "Order", order, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(200)
        .json(SuccessResponse(404, "Order not found", null, null));
    }
    order.status = status;
    await order.save();
    res
      .status(200)
      .json(SuccessResponse(200, "Order status updated", order, null));
  } catch (error) {
    res
      .status(200)
      .json(SuccessResponse(200, "Internal server error", null, error.message));
  }
}
exports.totalOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).countDocuments();
    res
      .status(200)
      .json(SuccessResponse(200, "Total orders", orders, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};

exports.totalSales = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Delivered" });
    let total = 0;
    orders.forEach((order) => {
      total += order.totalBill;
    });
    res
      .status(200)
      .json(SuccessResponse(200, "Total amount", total, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};
exports.totalCompleteOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Delivered" }).countDocuments();
    res
      .status(200)
      .json(SuccessResponse(200, "Total complete orders", orders, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};

exports.totalPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Pending" }).countDocuments();
    res
      .status(200)
      .json(SuccessResponse(200, "Total pending orders", orders, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};

exports.totalProcessingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Processing" }).countDocuments();
    res
      .status(200)
      .json(SuccessResponse(200, "Total processing orders", orders, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
}


exports.totalCancelledOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "Cancelled" }).countDocuments();
    res
      .status(200)
      .json(SuccessResponse(200, "Total cancelled orders", orders, null));
  } catch (error) {
    res
      .status(500)
      .json(SuccessResponse(500, "Internal server error", null, error.message));
  }
};

exports.getLast5CompleteOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
    .populate("customer").populate("items.product")
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(5); // Limit to 5 orders

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching last 5 complete orders:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.overview = async (req, res) => {
  try {
    const totalOrders = await Order.find({}).countDocuments();
    const totalSales = await Order.find({ status: "Delivered" });
    let total = 0;
    totalSales.forEach((order) => {
      total += order.totalBill;
    });
    const totalCompleteOrders = await Order.find({ status: "Delivered" }).countDocuments();
    const totalPendingOrders = await Order.find({ status: "Pending" }).countDocuments();
    const totalProcessingOrders = await Order.find({ status: "Processing" }).countDocuments();
    const totalCancelledOrders = await Order.find({ status: "Cancelled" }).countDocuments();
    res.status(200).json(SuccessResponse(200, "Total orders and sales", {
      totalOrders,
      totalSales: total,
      totalCompleteOrders,
      totalPendingOrders,
      totalProcessingOrders,
      totalCancelledOrders,
    }));
  } catch (error) {
    console.error("Error fetching total orders and sales:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}