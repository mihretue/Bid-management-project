const mongoose = require("mongoose");

const biddingSchema = new mongoose.Schema({
   bidId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'advertModel'
   },
   bidderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'userModel'
   },
   bidderStatus:{
    type:"String",
    required:true,
   },
   bidDocPayment:{
    type:"String",
    required:true,
    default:"not-payed"
   },
    bidSecPayment:{
        type:"String",
        default:"not-payed"
    },
    bidPropFile:{
      type:String,
      default:"not-provided"
    },appTime:{
      type:Date,
      default:"0000-00-00"
    }
  },{collection:'bidding'});
  

const biddingModel = mongoose.model("biddingModel", biddingSchema);
module.exports = biddingModel;
