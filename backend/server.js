const express = require('express');
const http=require('http')
const app = express();
const bodyParser=require("body-parser");
const mongoose = require("mongoose");
const userModel = require("./models/user")
const advertModel = require("./models/adverts")
const messageModel = require('./models/message');
const nodemailer=require('nodemailer')
const cors=require("cors");
const socketIo=require('socket.io')
const server=http.createServer(app)
const io=socketIo(server)
const {google}=require('googleapis')
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const multer = require('multer');
const port = 3001;
const {v4:uuidv4}=require('uuid')
const biddingModel=require('./models/bidding')
const dotenv=require('dotenv')

const mongoUrl="mongodb+srv://mihretu:mihretuendeshawrkr@methane.0fjzoxr.mongodb.net/Bid?retryWrites=true&w=majority";
dotenv.config();
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
    response.json(docs)
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

app.get('/getbidsPU/:id', (request, response) => {
  const status = request.params.id
  advertModel.find({status:status})
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

app.get('/checkprocid/:id',(req,res)=>{
const id=req.params.id
advertModel.findOne({id:id})
.then((docs)=>{
  res.json(docs)
})
.catch((err)=>res.json(err))
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

app.get('/userbyprop', (request, response) => {
  const {pBody,role}=request.query;
  userModel.findOne({pBody:pBody,role:role})
  .then((docs)=>{
    response.json(docs)
  })
  .catch(err=>response.json(err))
})

app.get('/tenderbyprop', (request, response) => {
  const {pBody,approvalRequested}=request.query;
  advertModel.find({ent:pBody,approvalRequested:approvalRequested})
  .then((docs)=>{
    response.json(docs)
  })
  .catch(err=>response.json(err))
})

app.get('/tenderbypropp', (request, response) => {
  const {pBody,approved}=request.query;
  advertModel.find({ent:pBody,approved:approved})
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

app.post('/sendemail',(req,res)=>{
   const input=req.body
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "mihretuendeshaw84@gmail.com",
      pass: "aewyfmdmdivakofm",
    },
  });
    const mailOptions = {
      from: "mihretuendeshaw84@gmail.com",
      to:input.to,
      subject: input.subject,
      text: input.body,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json({res:"error"});
      } else {
        res.json({res:"ok"});
      }
    });
})
const uuid=uuidv4()
const BidDocstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/biddocs')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = uuidv4()
    cb(null, `${fileName}.${ext}`);
  }
});
const uploadBidDoc = multer({ storage: BidDocstorage });

app.post('/uploadbiddocument' ,(req, res) => {
  uploadBidDoc.single('file')(req,res,(err=>{
    if(err){
      res.json({res:"error"});
    }else{
      res.json({res:req.file.filename});
    }
  }))
  
});

const BidAwardstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/bidawards')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = uuidv4()
    cb(null, `${fileName}.${ext}`);
  }
});
const uploadBidAward = multer({ storage: BidAwardstorage });

app.post('/uploadbidaward' ,(req, res) => {
  uploadBidAward.single('file')(req,res,(err=>{
    if(err){
      res.json({res:"error"});
    }else{
      res.json({res:req.file.filename});
    }
  }))
  
});

const BidRequeststorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/bidrequests')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = uuidv4()
    cb(null, `${fileName}.${ext}`);
  }
});
const uploadBidRequest = multer({ storage: BidRequeststorage });

app.post('/uploadbidrequest' ,(req, res) => {
  uploadBidRequest.single('file')(req,res,(err=>{
    if(err){
      res.json({res:"error"});
    }else{
      res.json({res:req.file.filename});
    }
  }))
  
});

app.post('/requestapproval/:bid',(request,response)=>{
  const bid=request.params.bid;
  const input=request.body
  advertModel.findOneAndUpdate({_id:bid}, {$set:{ bidReqFile:input.bidReqFile,approvalRequested:true}},{new:true,useFindAndModify:false})
  .then(updatedUser => {
      response.json({res:"ok"})
  })
  .catch((err)=>{
    console.log(err)
  });
  })

const BidPropstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/bidprops')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = uuidv4()
    cb(null, `${fileName}.${ext}`);
  }
});
const uploadBidProp = multer({ storage: BidPropstorage });

app.post('/uploadbidproposal' ,(req, res) => {
  uploadBidProp.single('file')(req,res,(err=>{
    if(err){
      res.json({res:"error"});
    }else{
      res.json({res:req.file.filename})
    }
  }))
  
});

app.post('/savebidproposal',(request,response)=>{
  const input=request.body;
  biddingModel.findOneAndUpdate({bidId: request.query.tid,bidderId:request.query.uid}, {$set:{ bidPropFile:input.bidPropFile,appTime:input.appTime}},{new:true,useFindAndModify:false})
  .then(updatedUser => {
      response.json({res:"ok"})
  })
  .catch((err)=>{
    console.log(err)
  });
  })

  app.post('/savebidaward/:bid',(request,response)=>{
    const input=request.body;
    const bid=request.params.bid
    advertModel.findOneAndUpdate({_id:bid}, {$set:{ bidAwardFile:input.bidAwardFile,status:"closed"}},{new:true,useFindAndModify:false})
    .then(updatedUser => {
        response.json({res:"ok"})
    })
    .catch((err)=>{
      console.log(err)
    });
    })

    app.get('/approvebid/:bid',(request,response)=>{
      const bid=request.params.bid
      advertModel.findOneAndUpdate({_id:bid}, {$set:{approvalRequested:false,approved:true}},{new:true,useFindAndModify:false})
      .then(updatedUser => {
          response.json({res:"ok"})
      })
      .catch((err)=>{
        console.log(err)
      });
      })

//register after bid prop is filled successfully
app.post('/registerbidder',(request,response)=>{
  const input=request.body;
  const uidm=new mongoose.Types.ObjectId(input.bidderId)
  const tidm=new mongoose.Types.ObjectId(input.bidId)
  biddingModel.findOne({bidderId:uidm,bidId:tidm})
  .then((docs)=>{
    if(docs){
      biddingModel.findOneAndUpdate({bidId:input.bidId,bidderId:input.bidderId}, {$set:{ bidderStatus:"bidding",bidPropFile:input.bidPropFile,appTime:input.appTime}},{new:true})
      .then((res)=>{response.json({res:"ok"})})
      .catch((err)=>{console.log(err)})
    }else{
      const newBidding=new biddingModel({
        bidId:input.bidId,
        bidderId:input.bidderId,
        bidderName:input.bidderName,
        bidderStatus:input.bidderStatus,
        bidDocPayment:input.bidDocPayment,
        bidPropFile:input.bidPropFile,
        appTime:input.appTime
      });
      newBidding.save()
      .then((res)=>{
        response.json({res:"ok"})
      })
      .catch((err)=>{response.json(err)})
    }
  })
    
  })

app.get('/checkbidder', (request, response) => {
  const {bid,uid}=request.query;
  const uidm=new mongoose.Types.ObjectId(uid)
  biddingModel.findOne({bidderId:uidm,bidId:bid})
  .then((docs)=>{
    response.json(docs)
  })
  .catch((err)=>response.json(err))
});

app.get('/getbidding',(req,res)=>{
  const id = req.query.id;
  biddingModel.find({bidderId:id})
  .then((docs)=>{
    res.json(docs)
  })
  .catch(err=>res.json(err))
})

app.get('/getbiddingb',(req,res)=>{
  const {bid,id} = req.query;
  biddingModel.findOne({bidId:bid,bidderId:id})
  .then((docs)=>{
    res.json(docs)
  })
  .catch(err=>res.json(err))
})

app.get('/getbiddingall',(req,res)=>{
  biddingModel.find()
  .then((docs)=>{
    res.json(docs)
  })
  .catch(err=>res.json(err))
})

app.get('/getbiddingo/:id',(req,res)=>{
  const id = req.params.id;
  biddingModel.findOne({_id:id})
  .then((docs)=>{
    res.json(docs)
  })
  .catch(err=>res.json(err))
})

app.get('/withdrawtender',(req,res)=>{
  const {bid,id} = req.query;
  biddingModel.findOneAndUpdate({bidId:bid,bidderId:id}, {$set:{ bidderStatus:"cancelled"}},{new:true})
  .then(()=>{
    res.json({res:"ok"})
  })
  .catch(err=>res.json(err))
})

app.get('/makepayment',(request,response)=>{
  const {tid,uid}=request.query
  const tidm=new mongoose.Types.ObjectId(tid)
  const uidm=new mongoose.Types.ObjectId(uid)
          const newBidding=new biddingModel({
            bidderId:uidm,
            bidId:tidm,
            bidDocPayment:"payed",
          });
          newBidding.save()
          .then((res)=>{
            response.json({res:"ok"})
          })
          .catch((err)=>{response.json(err)})
        }
)
//MESSAGES

app.get('/getinbox', (request, response) => {
  const par=request.query.email
  messageModel.find({to:par})
  .then((err,docs)=>{
   if(err) response.send(err)
   else
    response.json({docs})
  })
});

app.get('/getsent', (request, response) => {
  const par=request.query.email
  messageModel.find({from:par})
  .then((err,docs)=>{
   if(err) response.send(err)
   else
    response.json({docs})
  })
});

const msgFilestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/msgfiles')
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    const fileName = uuidv4()
    cb(null, `${fileName}.${ext}`);
  }
});

const uploadMsgFile = multer({ storage: msgFilestorage });

app.post('/savemsg', (request, response) => {
  const newMsg=request.body;
  if(newMsg.file){
  uploadMsgFile.single('file')(request,response,(err=>{
    if(err){
      res.json({res:"error"});
    }else{
      const msg=new messageModel({
        to:newMsg.to,
        from:newMsg.from,
        from_name:newMsg.from_name,
        subject:newMsg.subject,
        body:newMsg.body,
        file:newMsg.file.filename
      });
      msg.save()
      .then((res)=>{
        response.json({res:"ok"})
      })
      .catch((err)=>{response.json(err)})
    }
  }))}else{
    const msg=new messageModel({
      to:newMsg.to,
      from:newMsg.from,
      from_name:newMsg.from_name,
      subject:newMsg.subject,
      body:newMsg.body,
      file:""
    });
    msg.save()
    .then((res)=>{
      response.json({res:"ok"})
    })
    .catch((err)=>{response.json(err)})
  }
    }
)

app.get('/getmessage/:id', (request, response) => {
  const mid=request.params.id;
  const midm=new mongoose.Types.ObjectId(mid)
  messageModel.findOne({_id:midm})
  .then((docs)=>{
    response.json(docs)
  })
  .catch(err=>response.json(err))
})

app.get('/deletemessage/:id', (request, response) => {
  const mid=request.params.id;
  const midm=new mongoose.Types.ObjectId(mid)
  messageModel.findOneAndDelete({_id:midm})
  .then((docs)=>{
    response.json({res:"ok"})
  })
  .catch(err=>response.json(err))
})









//CHAPA//
  const router = require("express").Router();
  const request = require("request");
  const tx_ref = uuidv4();
  const SECRET_KEY="CHASECK_TEST-x53OdtP7UdSj9ybRLKZEdB4FTYIuH3VX"
  app.post("/api/payment/initialize/orders", async (req, res) => {
  try {
    const {
      key,
      amount,
      currency,
      email,
      first_name,
      last_name,
      phone_number,
      callback_url,
      return_url,
    } =  req.body; 
    
    const options = {
      method: "POST",
      url: "https://api.chapa.co/v1/transaction/initialize",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        amount,
        currency,
        email,
        first_name,
        last_name,
        phone_number,
        tx_ref,
        callback_url, 
        //   return_url,
        "customization[title]": "Payment for my favourite merchant",
        "customization[description]": "I love online payments.",
        "subaccounts[id]": "1c98dafb-a0dc-4d1b-a08d-dc3bfe996b9c",
      }),
    };
    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      const data = JSON.parse(response.body).data;
      console.log(JSON.parse(response.body))
      // res.json({ checkoutUrl: data.checkout_url });
    });
  } catch (error) {
    console.log(error);
  }
  });

  app.get("/api/payment/verify", async (req, res) => {
  try {
    var request = require("request");
    var options = {
      method: "GET",
      url: `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      //   https://checkout.chapa.co/checkout/test-payment-receipt/APAqop5avZGC5
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    };
    request(options, async function (error, response)  {
      if (error) throw new Error(error);
      // console.log(response.body);
      // res.json(JSON.parse.body);
      // const paymentDetails = res.json(JSON.parse.body);
      const paymentDetails = JSON.parse(response.body);
      // const payment = new Payment(paymentDetails.data);
      // await payment.save();

      res.json(paymentDetails);
    
    });
  } catch (error) {
    console.log(error);
  }
  });

   app.get('/data', async (req, res) => {
  // const { status, limit } = req.query;
  const payments = await Payment.find();
  res.json(payments);
  // console.log(payments);
  });
 //CHAPA

server.listen(port, () => console.log(`App listening on port ${port}!`));