import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';
import videoRoutes from './Routes/videoRoutes.js';
import commentRoutes from './Routes/CommentRoutes.js'; // ✅ Correct import

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes); // ✅ Fixed comments route

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/video_platform', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));
