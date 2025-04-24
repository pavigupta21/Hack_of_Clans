import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({

    email:{
        type:String, 
        required: true, 
        unique:true, 
    },
    password:{
        type: String, 
        required: true, 
    },
    name:{
        type: String, 
        required: true,
    },
    profilPic: {
        type: String, // F**** sari galiyaaaannn di jayegi tumhee sale ek E nahi thaa profil:E:Pic mein yeh bug dhundte dhundte mere ........ ho gaye
        default: "",
    },
    lastlogin:{
        type: Date,
        default: Date.now
    },
    isVerified:{
        type: Boolean, 
        default: false, 
    },

    newUser:{
        type: Boolean,
        default:false,
    },
    
    googleUser:{
        type: Boolean, 
        default: false,
    },

    resetPasswordToken: String, 
    resetPasswordExpiresAt: Date, 
    verificationToken: String, 
    verificationTokenExpiresAt: Date,  

    
    teams:[
        {
            teamId: mongoose.Schema.Types.ObjectId, 
            isLeader: Boolean, 
        }
    ],

    skills:[
        {
            skillname:String, 
            level: String,
        }
    ],

    personal_info:{
        bio:{
            type: String, 
            default:"",
        },
        college:{
            type: String, 
            default: "",
        }
    },

    personal_links:{
        github_link:{
            type:String, 
            default:""
        }, 
        linkdin_link:{
            type:String, 
            default:""
        }, 
        portfolio_link:{
            type:String, 
            default:""
        },
    }
},{timestamps: true});

export const User = mongoose.model('User', userSchema);
