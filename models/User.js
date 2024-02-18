const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
    "username": {
        type:String,
        unique: true,
        required: true,
    },
    "email": {
        type: String,
        unique: true,
    },
    "password": {
        type: String
    },
    
});
UserSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bycrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;