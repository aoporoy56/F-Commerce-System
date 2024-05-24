const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./Config/DB');
const { CustomerRouter } = require('./Routers/CustomerRouters');
const { UserRouter } = require('./Routers/UserRouters');
const ProductRouter = require('./Routers/ProductRouters');
const OrderRouter = require('./Routers/OrderRouters');
const User = require('./models/UserModel');
const Order = require('./models/OrderModel');
const Product = require('./models/ProductModel');
const Customer = require('./models/CustomerModel');
dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});
const addAdmin = async () => {
    const checkAdmin = await User.findOne({
      $or: [{ email: "admin@gmail.com" }, { username: "admin" }],
    });
    console.log(checkAdmin);
    if(!checkAdmin){
        const user = new User({
            username: "admin",
            email: "admin@gmail.com",
            password : "admin",
            role : "admin",
            status : "active"
        });
        await user.save();
    }
}
// addAdmin();

const deleteAll = async () => {
    await User.deleteMany({});
    await Order.deleteMany({});
    await Product.deleteMany({});
    await Customer.deleteMany({});
}

app.use("/customer",CustomerRouter);
app.use("/user", UserRouter);
app.use("/product", ProductRouter);
app.use("/order", OrderRouter);


app.listen(PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
});