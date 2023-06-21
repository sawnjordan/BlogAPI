const express = require("express");
const {
  getAllUsers,
  registerUser,
  userLogin,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", userLogin);

module.exports = router;
