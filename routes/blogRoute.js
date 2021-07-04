const router = require('express').Router();
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/blogs', blogController.blog_get);


router.get('/create', authMiddleware.isAuth, blogController.addblog_get);
router.post('/create',authMiddleware.isAuth, blogController.addblog_post);


router.get('/read/:id', authMiddleware.isAuth, blogController.readblog_get);


router.get('/edit-delete-blogs', authMiddleware.isAuth, blogController.editDeleteBlog_get);


router.get('/edit-blogs/:id',authMiddleware.isAuth, blogController.editBlog_get);
router.post('/edit-blogs/:id',authMiddleware.isAuth, blogController.editBlog_post);

router.delete('/delete-blogs/:id',authMiddleware.isAuth, blogController.deleteBlog_delete);


module.exports = router;