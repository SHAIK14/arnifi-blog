const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
  try {
    console.log('Get blogs request - Query:', req.query);
    const { category, author } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (author) filter.author = { $regex: author, $options: 'i' };

    const blogs = await Blog.find(filter)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Get blogs error:', error.message);
    res.status(500).json({ message: error.message });
  }
};


const getBlogById = async (req, res) => {
  try {
    console.log('Get blog by ID:', req.params.id);
    const blog = await Blog.findById(req.params.id).populate('userId', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Get blog error:', error.message);
    res.status(500).json({ message: error.message });
  }
};


const createBlog = async (req, res) => {
  try {
    console.log('Create blog request:', req.body);
    const { title, category, content, image } = req.body;

    if (!title || !category || !content) {
      return res.status(400).json({ message: 'Please provide title, category, and content' });
    }

    const blog = await Blog.create({
      title,
      category,
      author: req.user.name,
      content,
      image: image || '',
      userId: req.user._id,
    });

    console.log('Blog created:', blog._id);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error.message);
    res.status(500).json({ message: error.message });
  }
};


const updateBlog = async (req, res) => {
  try {
    console.log('Update blog request:', req.params.id, req.body);
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    const { title, category, content, image } = req.body;

    blog.title = title || blog.title;
    blog.category = category || blog.category;
    blog.content = content || blog.content;
    blog.image = image !== undefined ? image : blog.image;

    const updatedBlog = await blog.save();

    console.log('Blog updated:', updatedBlog._id);
    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Update blog error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    console.log('Delete blog request:', req.params.id);
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (blog.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();

    console.log('Blog deleted:', req.params.id);
    res.status(200).json({ message: 'Blog removed successfully' });
  } catch (error) {
    console.error('Delete blog error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};