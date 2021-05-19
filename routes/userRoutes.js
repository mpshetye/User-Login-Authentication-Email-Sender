const router = require("express").Router();
const User = require("../models/userModel");

router.post("/register", (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password === confirmPassword) {
    const registerUser = new User(req.body);
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
});

router.post("/login", async (req, res) => {
  try {
    const password = req.body.password;
    const userDetails = await User.findOne({ userName: req.body.userName });
    if (userDetails.password == password) {
      res.send("log in successful");
    } else {
      res.send("Invalid");
    }
  } catch (err) {
    res.status(400).send("Invalid User");
  }
});

module.exports = router;
