const express = require('express');
const app = express();
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user")
const advertModel = require("./models/adverts")
const { ObjectId } = require('mongodb');
const nodemailer=require('nodemailer')
const axios=require('axios')
const cors=require("cors");
const { RestorePageRounded } = require('@mui/icons-material');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const multer = require('multer');
const port = 3001;
const {v4:uuidv4}=require('uuid')
const biddingModel=require('./models/bidding')
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

app.get('/getusers/:id', (request, response) => {
  const type=request.params.id
    userModel.find({status:type})
    .then((err,docs)=>{
     if(err) response.send(err)
     else
      response.json({docs})
    })
  
});

app.post('/getbids/:id', (request, response) => {
  const status = request.params.id
  const pbody = request.body.ent
  advertModel.find({ent:pbody,status:status})
  .then((err,docs)=>{
   if(err) response.send(err)
   else
    response.json({docs})
  })
});

app.get('/approve/:id',(request,response)=>{
userModel.findOneAndUpdate({ _id: request.params.id}, {$set:{ approved:true,status:"active"}},{new:true})
.then(updatedUser => {
    response.json({res:"ok"})
})
.catch((err)=>{
  console.log(err)
});
})

app.get('/release/:id',(request,response)=>{
  userModel.findOneAndUpdate({ _id: request.params.id}, {$set:{ approved:true,status:"active"}},{new:true})
  .then(updatedUser => {
      response.json({res:"ok"})
  })
  .catch((err)=>{
    console.log(err)
  });
  })

  app.get('/ban/:id',(request,response)=>{
    userModel.findOneAndUpdate({ _id: request.params.id}, {$set:{ status:"banned"}},{new:true})
    .then(updatedUser => {
        response.json({res:"ok"})
    })
    .catch((err)=>{
      console.log(err)
    });
    })

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

app.post('/newtender', (request, response) => {
  const input=request.body;
  const newUser=new advertModel({
            id:input.id,
            title:input.title,
            ent:input.ent,
            cat:input.cat,
            app:input.app,
            dead:input.dead,
            bidSec:input.bsec,
            inv:input.invD,
            open:input.opend,
            visit:input.visitd,
            vTax:input.vTax,
            coi:input.coi,
            lic:input.lic,
            lg:input.lg,
            vent:input.vent,
            nat:input.nat,
            vat:input.vat,
            gow:input.gow,
            tc:input.tc,
            pfee:input.pfee,
            status:"active",
            bidDocFile:input.bidDocFile
          });
          newUser.save()
          .then((res)=>{
            response.json({res:"ok"})
          })
          .catch((err)=>{response.json(err)})
        }
)

app.get('/canceltender/:id',(request,response)=>{
  advertModel.findOneAndUpdate({ _id: request.params.id}, {$set:{ status:"cancelled"}},{new:true})
  .then(updatedUser => {
      response.json({res:"ok"})
  })
  .catch((err)=>{
    console.log(err)
  });
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

app.get('/sendemail',(request,response)=>{
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'fanuelamare0925@gmail.com', // replace with your email address
        pass: '' // replace with your password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'fanuelamare0925@@gmail.com', // sender address
    to: 'fanuelamare7765@example.com', // list of receivers
    subject: 'Test Email', // Subject line
    text: 'Hello World!', // plain text body
    html: '<b>Hello World!</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        response.json({res:"error"});
    } else {
        response.json({res:info.response});
    }
});
})
const uuid=uuidv4()
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/biddocs')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = uuidv4()
    cb(null, `${fileName}.${ext}`);
  }
});

const upload = multer({ storage: storage });

app.post('/uploadbiddocument' ,(req, res) => {
  upload.single('file')(req,res,(err=>{
    if(err){
      res.json({res:"error"});
    }else{
      res.json({res:req.file.filename});
    }
  }))
  
});

app.get('/checkbidder', (request, response) => {
  const par=request.query.id
  biddingModel.findOne({bidderId:par})
  .then((err,docs)=>{
   if(err) response.send(err)
   else
    response.json({docs})
  })
});

app.



app.listen(port, () => console.log(`App listening on port ${port}!`));