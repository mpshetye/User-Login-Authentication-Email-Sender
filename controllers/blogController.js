const Blog = require('../models/blogModel');
const blog_get = (req, res) => {
  Blog.find().sort({createdAt: -1}).then(data => {
    res.status(200).render("blog", { blogs: data });
  }).catch(err => {
    console.log(err);
  });
  };

const addblog_get = (req, res) => {
    res.render("addBlog");
  };

const addblog_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then(result =>{
      res.status(200).json({blog: result});
    }).catch(err =>{
      console.log(err);
    });
  };


  module.exports.blog_get = blog_get;
  module.exports.addblog_get = addblog_get;
  module.exports.addblog_post = addblog_post;