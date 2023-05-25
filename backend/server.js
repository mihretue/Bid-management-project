const express = require('express');
const app = express();
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user")
const advertModel = require("./models/adverts")
const { ObjectId } = require('mongodb');

const cors=require("cors");
const { RestorePageRounded } = require('@mui/icons-material');
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
     }else if(sortBy=="Title"){
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

app.post('/getbids', (request, response) => {
  // const par=request.query.id
  const pbody = request.body.ent

  advertModel.find({ent:pbody})
  .then((err,docs)=>{
   if(err) response.send(err)
   else
    response.json({docs})
  })
});

app.post('/signup', (request, response) => {
  const input=request.body;
  userModel.findOne({uName:input.userName})
  .then((docs)=>{
    if(docs)
       response.json({res:"uName"})
    else{
     userModel.findOne({email:input.email})
     .then((docs)=>{
        if(docs) 
          response.json({res:"email"})
        else{
          const newUser=new userModel({
            fName:input.fName,
            lName:input.lName,
            uName:input.userName,
            role:input.role,
            bDay:input.bDay,
            email:input.email,
            pass:input.pass,
            approved:false,
            status:'not-approved'
          });
          newUser.save()
          .then((res)=>{
            response.json({res:"ok"})
          })
          .catch((err)=>{response.json(err)})
        }
     })
     .catch(err=>response.json(err))
      }})
      .catch(err=>response.json(err))
})

app.post('/login', (request, response) => {
  const input=request.body;
  userModel.findOne({email:input.email})
  .then((docs)=>{
    if(!docs)
       response.json({res:"email"})
    else{
      if(docs.pass==input.pass){
       response.json({res:"ok"})
      }else{
        response.json({res:"pass"})
       }
      }})
      .catch(err=>response.json(err))
})

app.post('/user', (request, response) => {
  const input=request.body;
  userModel.findOne({email:input.email})
  .then((docs)=>{
    response.json(docs)
  })
  .catch(err=>response.json(err))

})

app.get('/userbyid/:id', (request, response) => {
  const uid=request.params.id;
  userModel.findById(uid)
  .then((docs)=>{
    response.json(docs)
  })
  .catch(err=>response.json(err))
})

app.get('/getusers', (request, response) => {
   userModel.find().
   then((err,docs)=>{
    if(err) response.send(err)
    else{
      response.json(docs)
    }
     }
    )
});









app.listen(port, () => console.log(`App listening on port ${port}!`));