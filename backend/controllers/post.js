const Post = require("../models/Post")

//add
const addPost = async (post) => {
  const DEFAULT_IMAGE_URL = 'https://img.freepik.com/free-vector/businessman-suit-full-length-back-view-front-white-board-vector-illustration_1284-2777.jpg';

  const newPost = await Post.create({
    ...post,
    image: post.image || DEFAULT_IMAGE_URL
  });
  
  await newPost.populate({
    path: "comments",
    populate: "author",
  });

  return newPost;
};

//edit
const editPost = async (id, post) => {
  const newPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: "after",
  })

  await newPost.populate({
    path: "comments",
    populate: "author",
  })

  return newPost
}

//delete
const deletePost = (id) => {
  return Post.deleteOne({ _id: id })
}

//get list with search and pagination
const getPosts = async (search = "", limit = 10, page = 1) => {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: "i" } }),
  ])

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  }
}

//get item
const getPost = (id) => {
  return Post.findById(id).populate({
    path: "comments",
    populate: "author",
  })
}

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getPost,
}
