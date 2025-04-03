import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
    },

    teamMembers: [
      {
        member: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      }
    ],

    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    hackathon: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Team = mongoose.model("Team", teamSchema);
