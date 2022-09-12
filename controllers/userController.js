const User = require('../model/userModel');
const bycrpt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        //RECIEVE DATA FROM FRONTEND
        const { email, username, password } = req.body; 
        
        // CREDENTIALS CHECK 
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.json({msg: "Username already exists!", status: false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({msg: "Email already exists!", status: false});
        }

        // CREATING HASH OF PASSWORD USING BYCRPT LIBRARY
        const hashedPassword = await bycrpt.hash(password, 10);

        // CREATE USER IN DATABASE WITH PROCESSED CREDENTAILS
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        delete user.password;   // Delete original password for security from backend

        return res.json({status: true, user});
    } 
    catch (error) {
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        //RECIEVE DATA FROM FRONTEND
        const { username, password } = req.body; 
        
        // CREDENTIALS CHECK 
        const user = await User.findOne({username});
        if(!user){
            return res.json({msg: "Incorrect username or password!", status: false});
        }

        const passwordCheck = await bycrpt.compare(password, user.password); // Varify ENTERED PASSWORD WITH ACTUAL STORED PASSWORD, USING BYCRPT LIBRARY
        if(!passwordCheck){
            return res.json({msg: "Incorrect username or password!", status: false});
        }

        delete user.password;   // Delete original password for security from backend

        return res.json({status: true, user});
    } 
    catch (ex) {
        next(ex);
    }
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage
        });

        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
        
    } catch (ex) {
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next)=> {
    try{
        const users = await User.find({_id: {$ne: req.params.id}}).select([
            'email',
            'username',
            'avatarImage',
            '_id'
        ]);

        return res.json(users);
    }
    catch(ex){
        next(ex);
    }
};