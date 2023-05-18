var mongoose = require('mongoose')

const Schema = mongoose.Schema

var trackSchema = new mongoose.Schema({
  plays: {
    type: Number,
    required:true
  },
  genre: {
    type: String,
    required: true
  },
  likes: {
    type:Array,
    default:[],
    required:true
  }
     
   ,
  
  audioURL: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },


  title: {
    type: String,
    required: true
  },

  user_name: {
    type: String,
    required: true
  },
  


}, { timestamps: true })
var Track = mongoose.model('Track', trackSchema)
module.exports = Track