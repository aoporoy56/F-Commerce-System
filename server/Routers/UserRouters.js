const express = require("express");
const User = require("../models/UserModel");
const { createUser, allUser, login, deleteUser, updateStatus } = require("../Controller/UserController");
const UserRouter = express.Router();

UserRouter.post("/create", createUser);
UserRouter.get("/", allUser);
UserRouter.post("/login", login);
// UserRouter.get("/user", getUser);
// UserRouter.put("/update", updateUser);
UserRouter.put("/status/:id", updateStatus);
UserRouter.delete("/:id", deleteUser);

exports.UserRouter = UserRouter;
