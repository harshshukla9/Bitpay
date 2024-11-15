const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    } 
}, { 
    timestamps: true // Adds createdAt and updatedAt fields
});


const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId, //referce to user
        ref:'User',
        required:true
    },
    balance : {
        type:Number,
        required:true
    }
})

// Create the User model
const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports = { User,Account };
