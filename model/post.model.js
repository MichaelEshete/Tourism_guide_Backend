const mongoose= require("mongoose");

const postSchema = new mongoose.Schema({
    myFile : String
  },{
    collection: "post"
  }
  );
  
  const Post = mongoose.model('post', postSchema)
  module.exports = Post