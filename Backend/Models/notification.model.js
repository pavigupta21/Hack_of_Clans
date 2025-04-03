import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({

    to: {
        type:  mongoose.Schema.Types.ObjectId
    },

    from: {
        type:  mongoose.Schema.Types.ObjectId
    },

    heading: {
        type : String ,
        required: true
    },

    content: {
        type: String , 
        required: true
    },

    isReq : {
        type: Boolean , 
        required : true,
    }
})

export const Notification = mongoose.model('Notification', notificationSchema);
