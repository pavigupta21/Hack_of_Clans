const userModel = require("../Models/userModel.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const generateTokenandSetCookie = require("../Utils/GenerateTokenSetCookie.js");
const sendVerificationEmail = require("../Mail/emails.js");
const sendWelcomeEmail = require("../Mail/emails.js");
const sendPasswordResetEmail = require("../Mail/emails.js");
const sendResetSuccessEmail = require("../Mail/emails.js");
const { OAuth2Client } = require("google-auth-library");

// Create a Google OAuth2 client using your CLIENT_ID and CLIENT_SECRET from the .env file.
// Note: The third parameter "postmessage" is used for the code exchange.
const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "postmessage"
);

const signupUser = async (req, res) => {
    const { email, password, name, skill_set, bio } = req.body ; 
    try {
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await userModel.findOne({email}); 
        if(userAlreadyExists){
            return res.status(400).json({
                success : false , 
                message: "User Already Exists"
            });  
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const verificationToken = Math.floor(100000 + Math.random()* 900000).toString(); 

        const user = new userModel({
            email, 
            password: hashedPassword, 
            name,
            verificationToken,
            verificationTokenExpiresAt : Date.now() + 24 * 60 * 60 * 1000 , // 24 hrs
            skill_set: skill_set || [],
            teams: [],
            leaderin: [],
            bio: bio || "",
        })

        await user.save(); 

        generateTokenandSetCookie(res, user._id); 
        
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success : true, 
            message : "User Created Successfully", 
            user : {
                ...user._doc, 
                password: undefined
            }
        });

    } catch (error) {
        res.status(400).json({
            success : false , 
            message : error.message
        });
    } 
};

const loginUser = async (req, res) => {
  const { email, password } = req.body ; 
      
      try {
          const user = await userModel.findOne({email}); 
          if(!user){
              console.log("User not found "); 
              return res.status(400).json({
                  success: false, 
                  message: "User not found please signin", 
              })
          }
          const isPasswordValid = await bcrypt.compare(password, user.password); 
          if(!isPasswordValid){
              return res.status(400).json({
                  success: false,
                  message: "Invalid credentials"
              })
          }
  
          generateTokenandSetCookie(res, user._id); 
  
          user.lastLogin = new Date(); 
          await user.save(); 
  
          res.status(200).json({
              success : true, 
              message : "User Logged in", 
              user : {
                  ...user._doc,
                  password: undefined,
              }
          })
      } catch (error) {
          console.log(error); 
          res.status(400).json({
              success: false, 
              message: error.message
          });
      }
};

const verifyEmail = async (req, res) => {
    const {code} = req.body ; 
    try {
        const user = await userModel.findOne( {
            verificationToken : code, 
            verificationTokenExpiresAt: {$gt : Date.now() }
        })
        if(!user) { 
            return res.status(400).json({
                success : false , 
                message : "Invalid or expired verification code"
            })
        }
        user.isVerified = true ; 
        user.verificationToken = undefined ; 
        user.verificationTokenExpiresAt = undefined ; 

        await user.save() ; 

        await sendWelcomeEmail(user.email, user.name) ;
        
        res.status(200).json({
            success : true, 
            message: "Email Verified successfully", 
            user : [{
                    ...user._doc, 
                    password : undefined,
                }]
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false , 
            message: "Server Error"
        });
    }
};

const forgotPassword = async (req, res) => {
    
    const {email} = req.body; 
    try {
        const user = await userModel.findOne({email}); 

        if(!user){
            return res.status(400).json({
                success: false, 
                message: "User not found",
            })
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetPasswordExpiresAt = Date.now() + 1*60*60*1000; 

        user.resetPasswordToken = resetToken; 
        user.resetPasswordExpiresAt = resetPasswordExpiresAt ;

        await user.save();  

        //send email 
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({
            success: true, 
            message: "Password reset link sent to your email",
        });

    } catch (error) {
        console.log(error);
    }
};

const resetPassword = async (req, res) => {
    try {
        const {token} = req.params; 
        const {password} = req.body; 
        
        const user = await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt : Date.now()},
        })

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found",
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword ;
        user.resetPasswordToken = undefined, 
        user.resetPasswordExpiresAt = undefined, 

        await user.save();
        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true, 
            message: "Password reset successful",
        })

    } catch (error) {
        
    }
};

const logout = async (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json({
      success: true,
      message: "Logged out Successfully",
  })
};

const checkAuth = async (req, res) => {
    try {
        const user = await userModel.findById(req.userid).select("-password"); // -password to unselect the password

        if(!user){
            return res.status(400).json({
                success: false, 
                message: "User not found",
            })
        }

        res.status(200).json({
            success: true, 
            user : {
                ...user._doc, 
                resetPasswordExpiresAt : undefined, 
                resetPasswordToken: undefined,

            }
        })
    
    } catch (error) {
        console.log(error, "Error in check auth"); 
        return res.status(400).json({
            success: false, 
            message: error.message,
        })
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

module.exports = { signupUser, loginUser, verifyEmail, forgotPassword, resetPassword, logout, checkAuth, google_login, google_signup };
