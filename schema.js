const mongoose = require('mongoose');

// Define the MongoDB schema for blog posts
const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Ensures the title is required
        minlength: 3,   // Minimum length of the title
        maxlength: 100, // Maximum length of the title
      },
      content: {
        type: String,
        required: true, // Ensures the content is required
        minlength: 10,  // Minimum length of the content
      },
      author: {
        type: String,
        required: true, // Ensures the author is required
      },
      publicationDate: {
        type: Date,
        required: true, // Ensures the publicationDate is required
      },
      isArchived: {
        type: Boolean,
        default: false, // Default value of false
      },
      },
      {
        timestamps: true, // Enable timestamps
      }
);

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

exports.BlogPost= BlogPost;