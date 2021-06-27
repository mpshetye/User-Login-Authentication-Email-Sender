const router = require("express").Router();
const userController = require('../controllers/userController');


router.get("/register", userController.register_get);
router.post("/register", userController.register_user_post);

router.get("/login", userController.login_get);
router.post("/login", userController.login_user_post);

router.get("/logout", userController.logout_get);

module.exports = router;
