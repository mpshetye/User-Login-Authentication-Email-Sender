const router = require("express").Router();
const userController = require('../controllers/userController');


router.post("/register", userController.register_user);

router.post("/login", userController.login_user);

module.exports = router;
