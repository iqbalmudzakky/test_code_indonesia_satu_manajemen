if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const UserController = require("./controllers/userController");
const AuthController = require("./controllers/authController");
const authentication = require("./middlewares/authentication");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.post("/api/register", AuthController.register);
app.post("/api/login", AuthController.login);

// authentication middleware
app.use(authentication);

// need authentication for all routes below
app.get("/api/", UserController.getAllUsers);
app.get("/api/user/:noAplikasi", UserController.getUserDetailByNoAplikasi);
app.post("/api/add-user", UserController.addUser);
app.put("/api/update-user/:noAplikasi", UserController.updateUserDetail);
app.delete("/api/delete-user/:noAplikasi", UserController.deleteUser);
module.exports = app;
