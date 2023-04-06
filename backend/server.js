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
const mongoUrl="mongodb+srv://mihretu:mihretuendeshawrkr@methane.0fjzoxr.mongodb.net/Bid?retryWrites=true&w=majority";
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

app.post('/gettenders', (request, response) => {
     const {sortBy}=request.body;
     if(sortBy=="Invitation Date"){
      advertModel.find().sort({inv:1}).
      then((err,docs)=>{
       if(err) response.send(err)
       else response.json(docs)
      })
     }else if(sortBy=="Alphabet"){
      advertModel.find().sort({title:1}).
      then((err,docs)=>{
       if(err) response.send(err)
       else response.json(docs)
      })
     }else if(sortBy=="Deadline"){
      advertModel.find().sort({dead:1}).
      then((err,docs)=>{
       if(err) response.send(err)
       else response.json(docs)
      })
     }else{;}
     
 });

 app.get('/gettender', (request, response) => {
  const par=request.query.id
  advertModel.findOne({_id:par})
  .then((err,docs)=>{
   if(err) response.send(err)
   else
    response.json({docs})
  })
});











app.listen(port, () => console.log(`App listening on port ${port}!`));