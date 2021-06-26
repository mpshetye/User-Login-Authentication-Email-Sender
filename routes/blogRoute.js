const router = require('express').Router();
const blogController = require('../controllers/blogController');

router.get('/blogs', blogController.blog_get);

router.get('/create', blogController.addblog_get);
router.post('/create', blogController.addblog_post);

router.get('/read/:id', blogController.readblog_get);


// router.get('/create', blogController.blog_get);
// router.get('/create', blogController.blog_get);

module.exports = router;