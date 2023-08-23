const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
require("./dbConfig");
const {BlogPost} = require('./schema');

const app = express();
// Middleware for parsing JSON
app.use(express.json());

// create post
app.post('/posts', async (req, res) => {
  try {
    const newPost = new BlogPost({ ...req.body, isArchived: false });
    const validationError = newPost.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get all posts
app.get('/posts', async (req, res) => {
  try {
    const posts = await BlogPost.find({isArchived: false });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// get post by id
app.get('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    const post = await BlogPost.findOne({
        _id: req.params.id,
        isArchived: false 
      });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// update post
app.put('/posts/:id', async (req, res) => {
  try {
    
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    const updatedPost = await BlogPost.findById(req.params.id);

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    updatedPost.set({ ...req.body, isArchived: updatedPost.isArchived });

    const validationError = updatedPost.validateSync();
    if (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    await updatedPost.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error' });
  }
});

// delete post (soft delete)
app.delete('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    const updatedPost = await BlogPost.findByIdAndUpdate(
        req.params.id,
        { isArchived: true }, // Set isArchived to true for soft delete
        { new: true }
      );
  
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.status(200).send({ message:'Successfully deleted!'});

  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});



exports.blogPostFunction = app;
