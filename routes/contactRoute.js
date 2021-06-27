const router = require("express").Router();
const contactController = require('../controllers/contactController');


router.get("/contact_page", contactController.contact_get);
router.post("/contact_page", contactController.contact_post);

module.exports = router;
