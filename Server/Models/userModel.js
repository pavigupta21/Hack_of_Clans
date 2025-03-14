const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
    {
        email:{
            type: String, 
            required: true, 
            unique: true
        }, 
        password: {
            type: String, 
            required: true
        },
        name: {
            type: String, 
            required: true
        }, 
        lastLogin: {
            type: Date, 
            default: Date.now
        },
        isVerified: {
            type: Boolean,
            default: false 
        },
        resetPasswordToken: String, 
        resetPasswordExpiresAt: Date, 
        verificationToken: String, 
        verificationTokenExpiresAt: Date,
        bio: { type: String, maxlength: 250 },
        skill_set: [{ type: String }],
        int_hackathon:[{type:String}],
        github_link:{type: String},
        linkedin_link:{type:String}
        //(Its stored in teamModel) teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
        //(Its stored in teamMOdel) leaderin: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }]
    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model("User", userschema);
module.exports = userModel;
