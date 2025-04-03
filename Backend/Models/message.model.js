import mongoose, { Schema } from "mongoose"; 

const messageSchema = new Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
    }, 

    receieverId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true, 
    }, 
    
    text : {
        type : String , 
        default: "",
    },

    image: {
        type: String,
        default: "",
    },
    
},
{
    timestamps: true,
})

export const Message = mongoose.model('Message', messageSchema);