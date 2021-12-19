const express= require('express');

const bodyParser= require('body-parser');
const postroutes=require('./routes/postroutes')
const mongoose=require('mongoose');

const app=express();

mongoose.connect("mongodb+srv://Kavya:8MNJvWSi0rdRNehY@cluster0.y0fhj.mongodb.net/PostsDB?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to database");
})
.catch(()=>{
  console.log("Connection failed!");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//mongosh "mongodb+srv://cluster0.y0fhj.mongodb.net/myFirstDatabase" --username Kavya
// 8MNJvWSi0rdRNehY
app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/posts',postroutes);

module.exports=app;

