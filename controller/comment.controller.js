const { Comment } = require("../models/blog.model.js");

// Create a new comment on a post
exports.createComment = async (req, res) => {
  const { postId, content } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comment = new Comment({
      content,
      post: postId,
      author: req.user.id, // set the author to the currently logged in user
    });

    await comment.save();

    // Add the comment to the post's comments array
    post.comments.push(comment);

    await post.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get all comments for a post
exports.getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const comments = await Comment.find({ post: postId })
      .populate("author", ["name", "email"]) // populate author field with name and email of the user
      .sort({ createdAt: -1 }); // sort by creation date in descending order

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Update a comment by ID
exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    let comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check if the currently logged in user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to update this comment" });
    }

    comment.content = content || comment.content;

    await comment.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete a comment by ID
exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    let comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check if the currently logged in user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to delete this comment" });
    }

    // Remove the comment from the post's comments array
    const post = await Post.findById(comment.post);
    post.comments.pull(comment._id);
    await post.save();

    await comment.remove();

    res.json({ msg: "Comment removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
