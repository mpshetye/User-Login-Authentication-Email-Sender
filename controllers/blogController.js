const Blog = require("../models/blogModel");

const blog_get = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.status(200).render("blog", { blogs: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addblog_get = (req, res) => {
  res.render("addBlog");
};

const addblog_post = (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.status(200).json({ blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const readblog_get = (req, res) => {
  let blogID = req.params.id;
  Blog.findById(blogID)
    .then((result) => {
      console.log(result);
      res.render("blogView", { blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};


const editDeleteBlog_get = (req, res) => {
  let blogUserName = req.userName;
  Blog.find({blogUserName})
    .then((result) => {
      res.render("editDeleteBlog", { userName: blogUserName, userBlogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};


const editBlog_get = (req, res)=>{
  let blogID = req.params.id;
  Blog.findById(blogID)
    .then((result) => {
      console.log(result);
      res.render("editBlog", { blog: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const editBlog_post = (req, res)=>{
  let blogID = req.params.id;
  let data = {};
  data.blogTitle = req.body.blogTitle;
  data.blogSnippet = req.body.blogSnippet;
  data.blogBody = req.body.blogBody;
  Blog.findByIdAndUpdate(blogID, data, function(err, result){
    if (err) throw err;
    res.redirect(`/nodeblogapi/read/${result._id}`);
    // res.redirect(`/nodeblogapi/blogs`);
  });

};


const deleteBlog_delete =async(req, res) =>{
  let blogID = req.params.id;
  await Blog.findByIdAndDelete(blogID);
  res.json({redirect:`/nodeblogapi/edit-delete-blogs` });
};

module.exports.blog_get = blog_get;
module.exports.addblog_get = addblog_get;
module.exports.addblog_post = addblog_post;
module.exports.readblog_get = readblog_get;
module.exports.editDeleteBlog_get = editDeleteBlog_get;
module.exports.editBlog_get = editBlog_get;
module.exports.editBlog_post = editBlog_post;
module.exports.deleteBlog_delete = deleteBlog_delete;
