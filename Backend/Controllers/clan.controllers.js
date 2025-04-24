import { User } from '../Models/user.model.js';
import bcrypt from 'bcryptjs'; 
import { generateTokenSetCookie } from '../Utils/generateTokenSetCookie.js';
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail,sendResetSuccessEmail } from '../Mails/email.js';
import crypto from "crypto";
import { oauth2Client } from '../Utils/googleConfig.js';
import axios from 'axios';
import cloudinary from "../Utils/cloudconfig.js";


export const signup = async(req, res) => {
    const {email, password, name, skills, personal_links} = req.body; 

    try{
        if(!email || !password || !name){
            throw new Error("Email, Password or name is not entered");
        }
		// console.log(email);
        const userAlreadyExists = await User.findOne({email}); 
		// console.log(userAlreadyExists)
        if(userAlreadyExists) {
            return res.status(400).json({message:"User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email, 
            password: hashedPassword, 
            name, 
            verificationToken, 
            verificationTokenExpiresAt: Date.now() + 24*60*60*1000,
			newUser: true,
            skills, 
            personal_links,
			newUser: true, 

        }); 

        await user.save(); 

        generateTokenSetCookie(res, user._id);  

        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true, 
            message: "User create successfully", 
            user:{
                ...user._doc, 
                password:undefined,
            }
        })

    }catch(error){
        res.status(400).json({sucess: false, message: error.message});
    }

};

export const verifyEmail = async(req, res) => {
    const { code } = req.body;
	try {
        const user = await User.findOne({
            verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() },
		});
        
		if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
		}
        
		user.isVerified = true;
		user.verificationToken = undefined;
		user.verificationTokenExpiresAt = undefined;
		await user.save();
        
		await sendWelcomeEmail(user.email, user.name);
        
		res.status(200).json({
            success: true,
			message: "Email verified successfully",
			user: {
                ...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
        console.log("error in verifyEmail ", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export const login = async(req, res) => {
    const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenSetCookie(res, user._id);

		user.lastlogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = async(req, res) => {
    res.clearCookie("hackofclansauth");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async(req, res) => {
    const { email } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		const resetToken = crypto.randomBytes(20).toString("hex");
		const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = resetTokenExpiresAt;

		await user.save();

		await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

		res.status(200).json({ success: true, message: "Password reset link sent to your email" });
	} catch (error) {
		console.log("Error in forgotPassword ", error);
		res.status(400).json({ success: false, message: error });
	}
};

export const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { password } = req.body;

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful" });
	} catch (error) {
		console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password"); // -password to unselect the password

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

export const googleLogin = async(req, res) => {
	const { code } = req.query;  
	// console.log("code is :", code);
	try {
		// console.log("running ", code);
		const googleRes = await oauth2Client.getToken(code); 
		// console.log("running ", googleRes);
		oauth2Client.setCredentials(googleRes.tokens);
		const token = googleRes.tokens.access_token;
		// console.log("token is :" , token);
		const userRes = await axios.get(
			`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
		)

		const temppassword = Math.floor(10000 + Math.random()*90000).toString(); 

		const hashedpassword = await bcrypt.hash(temppassword, 10);

		const { email, name } = userRes.data ; 
		let user = await User.findOne({email});
		if(!user){
			user = await User.create({
				email, 
				name,
				password : hashedpassword, 
				newUser: true,
				isVerified: true,
				googleUser: true,
			}) 

			sendWelcomeEmail(email, name);
		}

		generateTokenSetCookie(res,user._id); 

		user.lastlogin = new Date();
		await user.save();

		// console.log("running google Login and sending response");
		return res.status(200).json({
			message: 'success',
			token, 
			...user._doc,
			password: undefined
		})
	} catch (error) {
		console.log("Yaha error aa raha hai");
		console.log(error);
	}
};

export const startupHandler = async(req, res) => {
	const {user, skills, personal_info, personal_links, password } = req.body; 
	console.log(user);
	console.log(skills, personal_info, personal_links, password);
	try {
		if(!user.newUser){
			console.log("Code broke here...1");
			return res.status(400).json({
				success: false,
				message: "You are a old user"
			})
		}
		else if(user.newUser && user.googleUser && !password){
			console.log("Code broke here...2");

			return res.status(400).json({
				success: false,
				message: "Please enter password"
			})
		}
		else if(skills.length === 0){
			console.log("Code broke here...3");
			return res.status(400).json({
				success: false, 
				message: "Please select atleast one skill!"
			})
		}
		else{
			console.log("Code broke here...4");
			console.log(skills)
			const userEmail = user.email ;
			// console.log("user ka email hai :",userEmail);
			const update_user = await User.findOne({email: userEmail}); 
			// console.log("finding user: ",update_user);
			if(!update_user){
				// console.log("updated user not found")
				res.status(400).json({
					sucess: false, 
					message: "Update skill usernot found"
				})
			}

			if(user.googleUser){

				const hashedPassword = await bcrypt.hash(password, 10);

				update_user.password = hashedPassword;
			}

			update_user.skills = skills;
			update_user.personal_info = personal_info;
			update_user.personal_links = personal_links;
			update_user.newUser = false,
			await update_user.save()

			// console.log(user, skills, personal_Info, personal_links, password);
			res.status(200).json({
				success: true, 
				message: "Account updated successfully",
				update_user: {
					...update_user._doc,
					password: undefined,
				},
			})
		}
		
	} catch (error) {
		res.status(400).json({
			success: false, 
			message: "Backend gave up please understand developers dardddddd"
		})
	}
};

export const updateProfile = async (req, res) => {
	const {user, skills, personal_Info, personal_links, profilePic } = req.body;

	//Literally going to cryyyy nowwww please future omkar age se soch samaj ke code likha karoooo plan karo pehle aur fir likhoooo 
	try {
		const dbUser = await User.findById(user._id); 

		if(!dbUser){
			res.status(400).json({
				success: false , 
				message: "User not found"
			})
			return; 
		}

		let imageUrl = "" ;

		if (profilePic) {
			const uploadResponse = await cloudinary.uploader.upload(profilePic);
			imageUrl = uploadResponse.secure_url;
		}

		if(skills) dbUser.skills = skills; 
		if(personal_Info) dbUser.personal_info = personal_Info;
		if(personal_links) dbUser.personal_links = personal_links;	
		if(profilePic) dbUser.profilPic = imageUrl; 
		
		await dbUser.save(); 

		// console.log({
		// 	success: true, 
		// 	skills, 
		// 	personal_info:personal_Info,
		// 	personal_links:personal_links,
		// 	imageUrl:imageUrl,
		// })

		res.status(200).json({
			success: true, 
			user:dbUser,
			skills, 
			personal_info:personal_Info,
			personal_links:personal_links,
			imageUrl:imageUrl,
		})

	} catch (error) {
		console.log(error, "Backend gave up on meeeeeeeee")
	}

};
