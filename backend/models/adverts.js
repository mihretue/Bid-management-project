const mongoose = require("mongoose");

const advertSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
    },
    approved:{
      type:Boolean,
      required:true,
      default:false
    },
    approvalRequested:{
      type:Boolean,
      required:true,
      default:false
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
    },visit:{
      type:String,
      required:true
    },status:{
      type:String,
      required:true
    },
    vTax:{
      type:String,
      required:true
    },
  coi:{
    type:String,
    required:true
  },
  lic:{
    type:String,
    required:true
  },
  lg:{
    type:String,
    required:true
  },
  vent:{
    type:String,
    required:true
  },
  nat:{
    type:String,
    required:true
  },
  vat:{
    type:String,
    required:true
  },
  gow:{
    type:String,
    required:true
  },
  tc:{
    type:String,
    required:true
  },
  pfee:{
    type:String,
    required:true
  },
  bidDocFile:{
    type:String,
    required:true
  },
  bidAwardFile:{
    type:String,
    required:true,
    default:'none'
  },
  bidReqFile:{
    type:String,
    required:true,
    default:'none'
  }
  },{collection:'Tenders'});
  

const advertModel = mongoose.model("advertModel", advertSchema);
module.exports = advertModel;
