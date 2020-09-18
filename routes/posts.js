const express = require('express');
const router = express.Router();

const Post = require('../models/Post');

//Get all posts
router.get('/', async (req, res) => {
  try {
    console.log('Finding posts');
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get specicic post
router.get('/:postId', async (req, res) => {
  try {
    console.log('Finding specific post');
    const id = req.params.postId;
    const specificPost = await Post.findById(id);
    res.json(specificPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete specific post
router.delete('/:postId', async (req, res) => {
  try {
    const id = req.params.postId;
    const deletedPost = await Post.deleteOne({ _id: id });
    res.json(deletedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a post
router.patch('/:postId', async (req, res) => {
  try {
    console.log('Updating post');
    const id = req.params.postId;
    console.log(id);
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: id },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
});

module.exports = router;
