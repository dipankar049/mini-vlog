const express = require('express');
const { getPosts, createPost, deletePost } = require('../controllers/postController');
const router = express.Router();
const protect = require("../middleware/protect");

router.get('/', getPosts);
router.post('/', protect, createPost);
router.delete('/:id', protect, deletePost);

module.exports = router;