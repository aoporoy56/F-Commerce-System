const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    price: {
        type: Number,
        // required: true,
        min: 0
    },
    quantity: {
        type: Number,
        required: true
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
});
OrderItemSchema.pre("save", async function (next) {
  try {
    // Fetch the product document using the product ID
    const product = await mongoose.model("Product").findById(this.product);

    // Calculate the total based on product price and quantity
    this.total = product.price * this.quantity;

    next();
  } catch (error) {
    next(error);
  }
});
const OrderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [OrderItemSchema],
    totalBill: {
        type: Number,
        required: true,
        min: 0
    },
    advance: {
        type: Number,
        required: true,
        min: 0
    },
    due: {
        type: Number,
        required: true,
        min: 0
    },
    specialInstructions: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
    