if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const UserController = require("./controllers/userController");
const AuthController = require("./controllers/authController");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/register", AuthController.register);
app.post("/login", AuthController.login);

// need authentication for all routes below
app.get("/", UserController.getAllUsers);
app.get("/user/:noAplikasi", UserController.getUserDetailByNoAplikasi);
app.post("/add-user", UserController.addUser);
app.put("/update-user/:noAplikasi", UserController.updateUserDetail);
app.delete("/delete-user/:noAplikasi", UserController.deleteUser);

module.exports = app;
