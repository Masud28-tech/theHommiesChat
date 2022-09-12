const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min:1,
        max:20
    },

    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },

    password: {
        type:String,
        required: true,
        min: 5
    },

    isAvatarImageSet: {
        type: Boolean,
        dafualt: false,
    },

    avatarImage: {
        type: String,
        default: "",
    },
});

module.exports = mongoose.model('Users', userSchema);