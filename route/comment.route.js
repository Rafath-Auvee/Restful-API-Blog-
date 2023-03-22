const express = require("express");
const router = express.Router();
const comment = require("../controller/comment.controller.js");


// Create a new comment on a post
router.post("/",  comment.createComment);

// Get all comments for a post
router.get("/:postId", comment.getComments);

// Update a comment by ID
router.put("/:id", comment.updateComment);

// Delete a comment by ID
router.delete("/:id", comment.deleteComment);

module.exports = router;
