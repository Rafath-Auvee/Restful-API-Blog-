const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [30, "Name cannot be more than 30 characters long"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /\S+@\S+\.\S+/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters long"],
      maxlength: [30, "Password cannot be more than 30 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      minlength: [2, "Title must be at least 2 characters long"],
      maxlength: [50, "Title cannot be more than 50 characters long"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: [true, "Please provide an author"],
    },
    comments: [
      {
        type: ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please provide content"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
    author: {
      type: ObjectId,
      ref: "User",
      required: [true, "Please provide an author"],
    },
    post: {
      type: ObjectId,
      ref: "Post",
      required: [true, "Please provide a post"],
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);
const Post = mongoose.model("Post", PostSchema);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = { User, Post, Comment };
