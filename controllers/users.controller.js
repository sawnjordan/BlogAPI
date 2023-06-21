const User = require("../models/users.model");
const bcrypt = require("bcryptjs");

const getAllUsers = async (req, res, next) => {
  let userList;
  try {
    userList = await User.find();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err?.message });
  }
  if (!userList) {
    return res.status(404).json({ msg: "No Any Users Found..." });
  }
  return res.status(200).json({ userList });
};

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err?.message });
  }

  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err?.message });
  }
  res.status(201).json({ msg: "User Created", user });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err?.message });
  }

  if (!existingUser) {
    return res
      .status(404)
      .json({ msg: "Cann't find the user with this email." });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ msg: "Incorrect Password" });
  }
  return res.status(200).json({ msg: "Login successful" });
};

module.exports = { getAllUsers, registerUser, userLogin };
