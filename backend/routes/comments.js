const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get('/:postId', async(req, res)=>{
    try{
        const comments = await Comment.find({ postId: req.params.postId});
        res.status(200).json(comments);
    }catch (err){
        res.status(500).json(err);
    }
});

router.post('/:postId', async(req,res)=>{
    try{
        const {userId, username, userProfilePicture, text}  = req.body;
         const postId = req.params.postId;
        const newComment = new Comment({ postId, userId, username, userProfilePicture, text
        });
        await newComment.save();
        res.status(200).json(newComment);
    }catch(err){
        res.status(500).json();
    }
});

module.exports = router;