if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const UserController = require("./controllers/userController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post("/login", UserController.login);
// app.get("/users", UserController.getAllUsers);
app.post("/add-user", UserController.addUser);
app.put("/update-user/:noAplikasi", UserController.updateUserDetail);
// app.delete("/delete-user/:id", UserController.deleteUser);

module.exports = app;
