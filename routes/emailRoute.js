const router = require("express").Router();
const authMiddleware = require('../middleware/authMiddleware');
const emailController = require('../controllers/emailController');


router.get("/email_page", authMiddleware.isAuth, emailController.email_get);
// router.post("/register", userController.register_user);

module.exports = router;
