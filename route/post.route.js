const express = require("express");
const router = express.Router();
const post = require("../controller/post.controller.js");
const authMiddleware = require('../middleware/auth.middleware.js');

// GET all posts
router.get("/", authMiddleware,  post.getPosts);

// POST create new post
router.post("/", post.createPost);

// GET single post by ID
router.get("/:id", post.getPostById);

// PUT update a post by ID
router.put("/:id", post.updatePost);

// DELETE delete a post by ID
router.delete("/:id", post.deletePost);

module.exports = router;
