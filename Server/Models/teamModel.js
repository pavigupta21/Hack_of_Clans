const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}], 
    leader: { type: mongoose.Schema.Types.ObjectId, ref: "User" } ,
    desc : {type:String ,maxlength : 250},
    maxMembers: { type: Number, required: true, min: 1, default: 3},
    part_hackathon:[{type:String}],
    req_skills:[{type:String}]
});

const teamModel = mongoose.model("Team", teamSchema);
module.exports = teamModel;
