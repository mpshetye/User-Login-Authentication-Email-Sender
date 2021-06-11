const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//handling errors
const handleErrors = (err) => {
  console.log(err.message, err.code);

  let errors = {
    firstName: ``,
    lastName: ``,
    email: ``,
    phone: ``,
    userName: ``,
    age: ``,
    gender: ``,
    password: ``,
  };

  // incorrect user name
  if (err.message == "incorrect user name") {
    errors.userName = `That user name is not registered`;
  }

  // incorrect password
  if (err.message == "incorrect password") {
    errors.password = `That password is incorrect`;
  }

  //duplicate error handling
  if (err.code === 11000) {
    errors.email = `that email is already registered`;
    errors.phone = `that phone is already registered`;
    errors.userName = `that user name is already registered`;

    return errors;
  }

  //validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 30 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const register_get = (req, res) => {
  res.render("register");
};

const register_user = async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password === confirmPassword) {
    try {
      const registerUser = await User.create(req.body);
      const token = createToken(registerUser._id);
      res.cookie("acjt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: registerUser._id });
    } catch (err) {
      const errorMessage = handleErrors(err);
      console.log(errorMessage);
      res.status(400).json({ errorMessage });
    }
  } else {
    res.send("password not matching");
  }
};

const login_get = (req, res) => {
  res.render("login");
};

const login_user = async (req, res) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;
    const userAuth = await User.login(userName, password);
    const token = createToken(userAuth._id);
    res.cookie("acjt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: userAuth._id });
  } catch (err) {
    const errorMessages = handleErrors(err);
    res.status(400).json({errorMessages});
  }
};

const logout_get = (req, res) =>{
  res.cookie('acjt', '', {maxAge: 1});
  res.redirect('/');
}

module.exports = {
  register_get,
  register_user,
  login_get,
  login_user,
  logout_get
};
