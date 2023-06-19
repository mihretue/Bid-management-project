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
   bidderName:{
    type:"String",
    required:true
  },
   bidderStatus:{
    type:"String",
    required:true,
    default:"not-bidding"
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
    },
    appTime:{
      type:String,
      default:Date.now()
    }
  },{collection:'bidding'});
  

const biddingModel = mongoose.model("biddingModel", biddingSchema);
module.exports = biddingModel;
