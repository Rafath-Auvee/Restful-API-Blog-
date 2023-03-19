const { Post, User } = require("../models/blog.model.js");

// Get a list of all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["name", "email"]) // populate author field with name and email of the user
      .sort({ createdAt: -1 }); // sort by creation date in descending order
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const authorUser = await User.findById(author);
    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }

    const post = new Post({
      title,
      content,
      author: authorUser._id, // set the author to the currently logged in user
    });

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author", ["name", "email"]);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Update a post by ID
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    let post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the currently logged in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to update this post" });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    let post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the currently logged in user is the author of the post
    if (post.author.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to delete this post" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
