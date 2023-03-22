const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller.js");

// GET all users
router.get("/", userController.getUsers);

// GET a user by ID
router.get("/:id", userController.getUserById);

// POST a new user
router.post("/", userController.createUser);

// PUT update a user by ID
router.put("/:id", userController.updateUser);

// DELETE a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
