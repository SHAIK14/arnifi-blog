const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Career', 'Finance', 'Travel', 'Technology', 'Lifestyle', 'Health', 'Food', 'Other'],
      default: 'Other',
    },
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    image: {
      type: String,
      default: '',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true, 
  }
);


blogSchema.index({ category: 1, author: 1, userId: 1 });

module.exports = mongoose.model('Blog', blogSchema);