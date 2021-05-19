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
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send("password not matching");
  }
});


module.exports = router;