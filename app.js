//MONGODB LOGIN DETAILS
//Username: sawnjordan
//Password: 2QRQKBn6mlTzv3ME
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/users.routes");
const port = 4005;
const app = express();

app.use(express.json());

app.use("/users", router);

mongoose
  .connect(
    "mongodb+srv://sawnjordan:2QRQKBn6mlTzv3ME@cluster0.chmgai6.mongodb.net/Blog?retryWrites=true&w=majority"
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
