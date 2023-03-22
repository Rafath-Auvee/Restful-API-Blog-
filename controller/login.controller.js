const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/blog.model.js");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials. User Not Found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, return error
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials. Password Not Matched" });
    }

    // Generate and sign JWT
    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
