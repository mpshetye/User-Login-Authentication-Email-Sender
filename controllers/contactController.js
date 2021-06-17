const nodemailer = require("nodemailer");

const contact_get = (req, res) => {
  res.render("contact");
};

const contact_post = (req, res) => {
  const htmlOutput = `<p>Dear ${req.body.firstName} ${req.body.lastName},</p>
  <p>Thank you for contacting nodeBlog. Your following message has been received and is being reviewed by our team.</p>
  <span style="background-color: #dddddd;"> "${req.body.messageArea}"</span>
  <p>Regards,
  </p>
  <p>
  The nodeBlog support team
  </p>`;

  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.USER_ID,
      pass: process.env.USER_PASS,
    },
  });
  let mailOptions = {
    from: '"Nodemailer Contact" <support@nodeBlog.com>',
    to: req.body.email,
    subject: req.body.subject,
    // text: ``,
    html: htmlOutput,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // res.status(200).render('contact',{ msg: "Email has been sent" });
    res.status(200).json({ msg: "Email has been sent" });
  });
};

module.exports.contact_get = contact_get;
module.exports.contact_post = contact_post;
