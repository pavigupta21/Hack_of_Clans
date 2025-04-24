import mongoose, { Schema } from "mongoose";

const hackathonSchema = new Schema(
  {
    
    headline : {
        type : String,
    },
    url : {
        type : String,
    },
    sub_headline : {
        type : String,
    }, 
    mode : {
        type: String,
    },
    location : {
        type: String,
    },
    no_of_participant : {
        type : Number
    },
    tags : [
        String
    ],
    status: {
        type: String,
    },
    organization_link : {
        type: String,
    },
    organization_logo : {
        type : String,
    },
    organization_name : {
        type :String,
    },
    dates : {
        type : String,
    }

    



  },
  { timestamps: true }
);

export const Hackathon = mongoose.model("Hackathon", hackathonSchema);