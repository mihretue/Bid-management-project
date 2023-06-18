const mongoose=require('mongoose')

const messageSchema = new mongoose.Schema({
  to: {
    type: String, 
    required: true },
  from: {
     type: String,
     required: true },
  from_name: {
      type: String,
      required: true },
  subject: {
        type: String,
        required: true },
  body: { 
    type: String, 
    required: true },
  seen: { 
      type: Boolean,
      default:false, 
      required: true },
  file: { 
        type: String, 
        required: false,
        default:""
     },
  time: {
     type: Date, 
     default: Date.now() }
},{collection:'messages'});

const messageModel = mongoose.model("messageModel", messageSchema);
module.exports = messageModel;