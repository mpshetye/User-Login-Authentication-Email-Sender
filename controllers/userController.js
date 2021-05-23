const User = require("../models/userModel");
const bcrypt = require('bcrypt');


const register_user = async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password === confirmPassword) {
    const registerUser = new User(req.body);
    registerUser.password = await bcrypt.hash(registerUser.password, 10);
    registerUser
      .save()
      .then((data) => {
        res.send(data);
        // res.redirect('/');
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("password not matching");
  }
};


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
  register_user,
  login_user,
};
