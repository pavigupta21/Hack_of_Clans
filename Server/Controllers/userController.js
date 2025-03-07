const userModel = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

// Create a Google OAuth2 client using your CLIENT_ID and CLIENT_SECRET from the .env file.
// Note: The third parameter "postmessage" is used for the code exchange.
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

const signupUser = async (req, res) => {
  try {
    const { name, email, password, skill_set, bio } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json("Invalid email");
    }

    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).json("Email already exists");
    }

    if (!password || password.length < 6) {
      return res.status(400).json("Password must be at least 6 characters");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      skill_set: skill_set || [],
      teams: [],
      leaderin: [],
      bio: bio || "",
    });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: newUser._id,
        teams: newUser.teams,
        leaderin: newUser.leaderin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      skill_set: newUser.skill_set,
      teams: newUser.teams,
      leaderin: newUser.leaderin,
      bio: newUser.bio,
      token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json("Email doesn't exist");
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        teams: user.teams,
        leaderin: user.leaderin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      skill_set: user.skill_set,
      teams: user.teams,
      leaderin: user.leaderin,
      bio: user.bio,
      token,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/**
 * Google Signup:
 * - Expects an authorization code from the frontend in req.body.code.
 * - Exchanges the code for tokens using oAuth2Client.
 * - Verifies the id_token to extract user data.
 * - If the email does not exist in our DB, a new user is created.
 */
const google_signup = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json("Authorization code is required");
    }

    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    if (!tokens.id_token) {
      return res.status(400).json("Google authentication failed");
    }

    // Verify the ID token and extract the user payload
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, email_verified } = payload;

    if (!email_verified) {
      return res.status(400).json("Email not verified by Google");
    }

    // Check if a user with this email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json("User already exists. Please log in using Google.");
    }

    // Generate a random password since the user is signing up via Google.
    // (This password won't be used, but it fulfills any schema requirements.)
    const randomPassword = Math.random().toString(36).slice(-8);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    // Create a new user using the Google information
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      skill_set: [],
      teams: [],
      leaderin: [],
      bio: "",
    });

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: newUser._id,
        teams: newUser.teams,
        leaderin: newUser.leaderin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      skill_set: newUser.skill_set,
      teams: newUser.teams,
      leaderin: newUser.leaderin,
      bio: newUser.bio,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

/**
 * Google Login:
 * - Expects an authorization code from the frontend in req.body.code.
 * - Exchanges the code for tokens and verifies the id_token.
 * - Checks if a user with the Google email exists.
 * - If found, generates and returns a JWT token along with user info.
 */
const google_login = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json("Authorization code is required");
    }

    // Exchange code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    if (!tokens.id_token) {
      return res.status(400).json("Google authentication failed");
    }

    // Verify the ID token to extract user data
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, email_verified } = payload;

    if (!email_verified) {
      return res.status(400).json("Email not verified by Google");
    }

    // Find the user in the DB using the email from Google
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json("User does not exist. Please sign up using Google.");
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
        teams: user.teams,
        leaderin: user.leaderin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      skill_set: user.skill_set,
      teams: user.teams,
      leaderin: user.leaderin,
      bio: user.bio,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

module.exports = { signupUser, loginUser, google_login, google_signup };
