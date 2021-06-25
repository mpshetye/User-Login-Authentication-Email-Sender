const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const blogSchema = new Schema(
  {
    blogFirstName: {
      type: String,
      required: [true, `Please enter your First Name`],
    },
    blogLastName: {
      type: String,
      required: [true, `Please enter your Last Name`],
    },
    blogEmail: {
      type: String,
      required: [true, `Please enter an email`],
      unique: true,
      lowercase: true,
      validate: [isEmail, `Please enter a valid email`],
    },
    blogUserName: {
      type: String,
      required: [true, `Please enter user name`],
      unique: true,
    },
    blogTitle: {
      type: String,
      required: [true, `Please enter title for the blog`],
    },
    blogSnippet: {
      type: String,
      required: [true, `Please enter snippet for the blog`],
    },
    blogBody: {
      type: String,
      required: [true, `Please enter body for the blog`],
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);

module.exports = Blog;
