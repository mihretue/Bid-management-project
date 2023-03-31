const express = require('express');
const app = express();
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user")
const advertModel = require("./models/adverts")

const cors=require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const port = 3001;
const mongoUrl="mongodb+srv://mihretu:mihretuendeshawrkr@methane.0fjzoxr.mongodb.net/Tenders?retryWrites=true&w=majority";
mongoose.connect(mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error",err=>{console.log(err)});
db.once("open", function () {
  console.log("Database Connected successfully!");
});

app.get('/gettenders', (request, response) => {
  advertModel.find((err,res)=>{
     res.json()
    


  })
 });











app.listen(port, () => console.log(`App listening on port ${port}!`));