const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) =>{
    const token = req.cookies.acjt;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
            if(err){
                console.log(err.message);
                res.redirect('/user/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        });
    }
    else{
        res.redirect('/user/login');
    }
}

module.exports.isAuth = isAuth;