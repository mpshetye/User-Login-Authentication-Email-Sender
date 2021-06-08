const User = require("../models/userModel");
const jwt = require('jsonwebtoken');


//handling errors
const handleErrors = (err)=>{
  console.log(err.message, err.code);
  
  let errors = {firstName:``,
    lastName:``,
    email:``,
    phone:``,
    userName:``,
    age:``,
    gender:``,
    password:``};

    //duplicate error handling
    if(err.code === 11000){
      errors.email = `that email is already registered`
      errors.phone = `that phone is already registered`
      errors.userName = `that user name is already registered`

      return errors;
    }

    //validation errors
    if (err.message.includes('User validation failed')){
      Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path] = properties.message;
      });
    }

    return errors

}


const maxAge = 30 * 60;
const createToken = (id) =>{
  return jwt.sign({id}, process.env.SECRET_KEY, {
    expiresIn: maxAge
  });
}

const register_get = (req, res) =>{
  res.render('register');
}

const register_user = async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password === confirmPassword) {
    try{
      const registerUser = await User.create(req.body) ;
      const token = createToken(registerUser._id);
      res.cookie('jToken', token, {httpOnly: true, maxAge: maxAge * 1000});
      res.status(200).json({user: registerUser._id});
    }
    catch(err){
      const errorMessage = handleErrors(err);
      console.log(errorMessage);
      res.status(400).json({errorMessage});
    }
  } else {
    res.send("password not matching");
  }
};


const login_get = (req, res) =>{
  res.render('login');
}


const login_user = async (req, res) => {
  try {
    const password = req.body.password;
    const userDetails = await User.findOne({ userName: req.body.userName });
    const userPassword = await bcrypt.compare(password, userDetails.password);
    if (userPassword) {
      res.send("log in successful");
    } else {
      res.send("Invalid");
    }
  } catch (err) {
    res.status(400).send("Invalid User");
  }
};


module.exports = {
  register_get,
  register_user,
  login_get,
  login_user,
};
