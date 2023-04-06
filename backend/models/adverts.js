const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ent: {
      type: String,
      required: true,
    },cat: {
      type: String,
      required: true,
    },app: {
      type: String,
      required: true,
    },dead: {
      type: Date,
      required: true,
    },bidSec: {
      type: String,
      required: true,
    },open: {
      type: Date,
      required: true,
    },inv: {
      type: Date,
      required: true,
    },partFee:{
      type:String,
      required:true
    },visit:{
      type:String,
      required:true
    },status:{
      type:String,
      required:true
    }
  },{collection:'Tenders'});
  

const advertModel = mongoose.model("advertModel", advertSchema);
module.exports = advertModel;
