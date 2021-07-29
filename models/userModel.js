const Schema = require("mongoose").Schema;
const { model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const registerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, `Please enter your First Name`],
  },
  lastName: {
    type: String,
    required: [true, `Please enter your Last Name`],
  },
  email: {
    type: String,
    required: [true, `Please enter an email`],
    unique: true,
    lowercase: true,
    validate: [isEmail, `Please enter a valid email`],
  },
  phone: {
    type: Number,
    required: [true, `Please enter a phone number`],
    unique: true,
    // min: [10, `Please enter correct phone number`],
    // max: [11, `Please enter correct phone number`]
  },
  userName: {
    type: String,
    required: [true, `Please enter user name`],
    unique: true,
  },
  age: {
    type: Number,
    required: [true, `Please enter your age`],
  },
  gender: {
    type: String,
    required: [true, `Please choose gender`],
  },
  password: {
    type: String,
    required: [true, `Please enter password`],
    minlength: [8, `Minimum password length is 8 characters`],
  },
  // confirmPassword:{
  //     type: String
  // }
});

registerSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

registerSchema.statics.login = async function (userName, password) {
  const user = await this.findOne({ userName });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect user name");
};

const User = model("User", registerSchema);

module.exports = User;
