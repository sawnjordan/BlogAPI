const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let userList;
  try {
    userList = await User.find();
    if (userList.length !== 0) {
      res.status(200).json({ userList });
    } else {
      //TODO: error
      next({ status: 404, msg: "No Users Found." });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      // res.status(400);
      next({ status: 400, msg: "User already exists" });
    } else {
      const hashedPassword = bcrypt.hashSync(password);
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      await user.save();
      res.status(201).json({ msg: "User Created", user });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ msg: "Cann't find the user with this email." });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        res.status(400).json({ msg: "Incorrect Password" });
      } else {
        res.status(200).json({ msg: "Login successful" });
      }
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { getAllUsers, registerUser, userLogin };
