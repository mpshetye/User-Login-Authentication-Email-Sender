const express = require('express');
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req, res)=>{
    res.status(200).render('index');
});






const port = process.env.PORT || 80;

app.listen(port, ()=>{
    console.log(`server is running at port ${port}`);
});
