const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isAuth = (req, res, next) =>{
    const token = req.cookies.acjt;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async(err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/user/login');
            }
            else{
                let user = await User.findById(decodedToken.id);
                req.userName= user.userName;
                next();
            }
        });
    }
    else{
        res.redirect('/user/login');
    }
}

const checkUser = (req, res, next) =>{
    const token = req.cookies.acjt;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.data = null;
                next();
            }
            else{
                console.log(decodedToken);
                let user = await User.findById(decodedToken.id);
                res.locals.data = user;
                next();
            }
        });
    }
    else{
        res.locals.data = null;
        next();
    }    
}

module.exports.isAuth = isAuth;
module.exports.checkUser = checkUser;