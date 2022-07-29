const router=require("express").Router();
const Post=require("../models/Post");
const User=require("../models/User");

//create pots
router.post("/",async(req,res)=>{
   const newPost=new Post(req.body);
    try{
        const savePost=await newPost.save();
        res.status(200).json("post has been create");
    }catch(err){
        res.status(500).json(err);
    }
});
//update post
router.put("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("you has been update this post");
        }else{
            res.status(403).json("you can't update this post");
        }
  

    }catch(err){
        res.status(500).json(err);
    }  
});
//delete post
router.delete("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.deleteOne();
            res.status(200).json("you has been delete this post");
        }else{
            res.status(403).json("you can't delete this post");
        }
  

    }catch(err){
        res.status(500).json(err);
    }  
})
//like/unlike a post
router.put("/:id/like",async(req,res)=>{
try{
    const post=await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push:{likes:req.body.userId}});
        res.status(200).json("you has been like this post");
    }else{
        await post.updateOne({$pull:{likes:req.body.userId}});
        res.status(200).json("you has been unlike this post");
    }
}catch(err){
    res.status(500).json(err);
}
});
//get post
router.get("/:id",async(req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
});
//get timeline post
router.get("/timeline/:userId",async(req,res)=>{
    try{
        const currentUser=await User.findById(req.params.userId);
        const userPosts=await Post.find({userId:currentUser._id});
        const friendPosts=await Promise.all(
            currentUser.followings.map((friendId)=>{
              return  Post.find({userId:friendId});
            })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
    }catch(err){
        res.status(500).json(err);
    }
});

//get post by username
router.get("/profile/:username",async(req,res)=>{
    try{
        const user =await User.findOne({username: req.params.username});
        const posts=await Post.find({userId: user._id});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
});




module.exports=router;