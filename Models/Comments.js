import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment; 
