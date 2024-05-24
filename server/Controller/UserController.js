const mongoose = require("mongoose");
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { SuccessResponse } = require("../Config/SuccessResponse");

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role, status } = req.body;
    const searchUser = await User.findOne({ username });

    if (searchUser) {
      return res
        .status(200)
        .json(SuccessResponse("Failed", "Username Already Exists", null, null));
    }
    const searchEmail = await User.findOne({ email });
    if (searchEmail) {
      return res
        .status(200)
        .json(SuccessResponse("Failed", "Email Already Exists", null, null));
    }
    const user = new User({ username, email, password, role, status });
    const result = await user.save();
    res.status(201).json(SuccessResponse("Success", "User Created", result, null));
  } catch (error) {
    res
      .status(200)
      .json(SuccessResponse("Failed", "User not Created", null, error.message));
  }
};

exports.allUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(SuccessResponse("Success", "All Users", users, null));
  } catch (error) {
    res.status(500).json(SuccessResponse("Failed", "No Users", null, error));
  }
};
exports.login = async (req, res) => {
  try{
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).json(SuccessResponse("Failed", "Please provide email and password", null, "Please provide email and password"));
    }
    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });
    if (!user) {
      return res.status(404).json(SuccessResponse("Failed", "User not found", null, "User not found"));
    }
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(200).json(SuccessResponse("Failed", "Invalid Password", null, "Invalid Password"));
      }
      if(user.status !== "active"){
        return res.status(200).json(SuccessResponse("Failed", "Your Account is "+user.status, null, "User is inactive"));
      }
      return res.status(200).json(SuccessResponse("Success", "Login Successful", user, null));
    });
  }catch(error){
    return res.status(500).json(SuccessResponse("Failed", "Login Failed", null, error.message));
  }
}

exports.deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            res.status(404).json(SuccessResponse("Failed", "User not found", null, "User not found"));
        }
        res.status(200).json(SuccessResponse("Success", "User Deleted", user, null));
    }catch(error){
        res.status(500).json(SuccessResponse("Failed", "User not Deleted", null, error.message));
    }
}
exports.updateStatus = async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(id, { status }, { new: true });
        if(!user){
            res.status(200).json(SuccessResponse("Failed", "User not found", null, "User not found"));
        }
        res.status(200).json(SuccessResponse("Success", "User Status Updated", user, null));
    }
    catch(error){
        res.status(500).json(SuccessResponse("Failed", "User Status not Updated", null, error.message));
    }
}
exports.lll = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json(SuccessResponse("Failed", "Please provide email and password", null, "Please provide email and password"));
        }
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json(SuccessResponse("Failed", "User not found", null, "User not found"));
        }        
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                res.status(500).json(SuccessResponse("Failed", "Login Failed", null, err.message));
            }
            if (!isMatch) {
                console.log(isMatch);
                res.status(200).json(SuccessResponse("Failed", "Invalid Password", null, "Invalid Password"));
            }
            res.status(200).json(SuccessResponse("Success", "Login Successful", user, null));
        });
    }
    catch (error) {
        res.status(500).json(SuccessResponse("Failed", "Login Failed", null, error.message));
    }
}