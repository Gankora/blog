const Comment = require("../models/Comment")
const Post = require("../models/Post")

//add
const addComment = async (postId, comment) => {
  const newComment = await Comment.create(comment)

  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } })

  await newComment.populate("author")

  return newComment
}

//delete
const deleteComment = async (postId, commentId) => {
  await Comment.deleteOne({ _id: commentId })
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } })
}

//get list for post

module.exports = {
  addComment,
  deleteComment,
}
