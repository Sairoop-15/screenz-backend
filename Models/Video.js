import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String, required: true },
  thumbnailUrl: { type: String }, 
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  uploadDate: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      text: { type: String, required: true }, 
      timestamp: { type: Date, default: Date.now }, 
    },
  ],
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
