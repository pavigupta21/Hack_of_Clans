import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();


// console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);  
// console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);  

export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage"
);