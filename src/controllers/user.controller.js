const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('../db/index')
const {
  createUser,
  findUserByEmailOrUsername,
  checkIfUserExists,
  findUserById,
} = require("../models/user.model");

const { ApiResponse } = require("../utils/ApiResponse");

const signupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await checkIfUserExists(username, email);

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await createUser(username, email, hashedPassword);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or Email is required");
  }

  const user = await findUserByEmailOrUsername(email, username);

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.JWT_TOKEN_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRY,
    }
  );
  const loggedInUser = await findUserById(user.id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          token,
        },
        "User logged in Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
   res.clearCookie("token");

  return res.status(200).json(new ApiResponse(200, null, "User logged out successfully."));
});

module.exports = {
  signupUser,
  loginUser,
  logoutUser
};
