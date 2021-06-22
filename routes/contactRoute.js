const router = require("express").Router();
// const authMiddleware = require('../middleware/authMiddleware');
const contactController = require('../controllers/contactController');


router.get("/contact_page", contactController.contact_get);
// router.get("/contact_page", authMiddleware.isAuth, emailController.email_get);
router.post("/contact_page", contactController.contact_post);

module.exports = router;
