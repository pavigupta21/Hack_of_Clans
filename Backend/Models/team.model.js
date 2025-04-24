import mongoose, { Schema } from "mongoose";
import { type } from "os";

const teamSchema = new Schema(
  {
    teamName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      description: "The name of the team (required, max 50 characters)"
    },

    teamMembers: [
      {
        member: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User",
          description: "Reference to User model for team members"
        },
      }
    ],

    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      description: "Reference to User model for the team leader (required)"
    },

    hackathon: {
      type: String,
      required: true,
      trim: true,
      description: "Name of the hackathon this team is participating in (required)"
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
      description: "Brief description of the team (max 500 characters)"
    },

    skills: {
      type: [String],
      default: [],
      description: "Array of skills needed/looking for in team members"
    },

    lookingForMembers: {
      type: Boolean,
      default: true,
      description: "Flag indicating if the team is open to new members"
    },

    logo: {
      type: String
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index for faster queries on commonly searched fields
teamSchema.index({ teamName: 'text', hackathon: 'text', description: 'text' });

// Virtual for member count
teamSchema.virtual('memberCount').get(function() {
  return this.teamMembers.length + 1; // +1 for the leader
});

export const Team = mongoose.model("Team", teamSchema);