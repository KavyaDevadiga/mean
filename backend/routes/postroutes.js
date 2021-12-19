const express=require("express");
const { model, models } = require("mongoose");
const multer=require('multer');
const Post=require('../models/post');
const router= express.Router();
const MIME_TYPE_MAP={
  'image/png':'png',
  'image/jpeg':'jpeg',
  'image/jpg':'jpg'
}
const storage=multer.diskStorage({destination:(req,file,cb)=>{
  cb(null,"backend/images");

},
filename:(req,file,cb)=>{
  const name=file.originalname.toLowerCase().split(' ').join('-');
  const ext=MIME_TYPE_MAP[file.mimetype];
  cb(null,name+'-'+Date.now()+'.'+ext);
}
});

router.post('',multer({storage:storage}).single("image"),(req,res,next)=>{
  const post=Post({
    title: req.body.title,
    content:req.body.content
  });

  post.save()
  .then(doc=>{
    console.log(doc)
    res.status(201).json({

      message:'Post added Successfully',
      post:doc
    })
  });
})
router.get('/:id',(req,res,next)=>{
  Post.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }
    else{
      res.status(404).json({message:'Post not found!!!!'});
    }
  });
});
router.get('',(req,res,next)=>{
  Post.find()
  .then(documents=>{
     res.status(200).json({
      message:'Posts fetched',
      posts:documents
    });
  });

});
router.delete('/:id',(req,res,nest)=>{
  Post.deleteOne({_id:req.params.id}).then(
    result=>{
      console.log(result);
    }
  )
  res.status(200).json({
    message:"Post deleted!"
  });
})
router.patch("/:id",(req,res,next)=>{
  const post={
    _id:req.params.id,
    title:req.body.title,
    content:req.body.content
  }
  Post.updateOne({_id:req.params.id},post).then(result=>{
    res.status(201).json({
      message:'Post updated Successfully',
      post:post
    })
  })
});

module.exports=router;
