require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
// const User = require('./models/userModel'); dot is root directory... to move out from another directory to root use two dots and then slash.

const app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

mongoose
  .connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    //we write app.listen here so that the server runs only after dB is connected
    const port = process.env.PORT || 80;
    app.listen(port, () => {
      console.log(`server is running at port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.use(userRoutes);
