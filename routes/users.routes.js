const express = require("express");
const {
  getAllUsers,
  registerUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);

module.exports = router;
