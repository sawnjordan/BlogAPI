//MONGODB LOGIN DETAILS
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users.routes");
const errorHandler = require("./middleware/errorHandler");
const port = 4005;
const app = express();

app.use(express.json());

app.use("/users", router);

app.use(errorHandler);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.chmgai6.mongodb.net/Blog?retryWrites=true&w=majority`
  )
  .then(app.listen(port))
  .then(() => {
    console.log(`Server listening to PORT:${port} and connected to DataBase`);
    console.log(`Browser: http://localhost:4005 `);
    console.log(`Press CTRL + C to STOP the server`);
  })
  .catch((err) => {
    console.log(err);
  });
