const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    from:{
      type:String,
      required:true
    },
    to:{
      type:String,
      required:true
    },
    time:{
      type:String,
      required:true
    }
  },{collection:'messages'});

const messageModel = mongoose.model("messageModel", messageSchema);
module.exports = messageModel;
