const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    postId: {type: mongoose.Schema.Types.ObjectId, ref: 'Post', require: true},
    userId: {type: String, require: true},
    username:{ type:String, require: true},
    userProfilePicture:{ type:Array, default:[] },
    text: {type:String, require: true},
},
{timestamps:true}
);

module.exports = mongoose.model('Comment', commentSchema);