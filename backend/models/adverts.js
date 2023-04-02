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
    entity: {
      type: String,
      required: true,
    },category: {
      type: String,
      required: true,
    },market: {
      type: String,
      required: true,
    },deadline: {
      type: Date,
      required: true,
    }
  },{collection:'Tenders'});
  

const advertModel = mongoose.model("advertModel", advertSchema);
module.exports = advertModel;
