const mongoose = require("mongoose");

const userschema = new mongoose.Schema(
    {
        name: { type: String, required: true,  maxlength: 30 },
        email: { type: String, required: true, maxlength: 200, unique: true },
        password: { type: String, required: true, minlength: 6, maxlength: 1024 },
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
