const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
});

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const userAvailable = await userModel.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("Email address already exists");
  }
  const hashPass = await bcrypt.hash(password, 10);

  console.log(hashPass);

  const user = await userModel.create({
    username,
    email,
    password: hashPass,
  });
  if (!user) {
    res.status(400);
    throw new Error("Submitted data is not correct");
  } else {
    res
      .status(201)
      .json({ _id: user.id, username: user.username, email: user.email });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401);
    throw new Error("Email or password is not valid!");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { username: user.username, email: user.email, id: user.id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1000m",
      }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Incorrect password");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { getUsers, registerUser, loginUser, currentUser };
