import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './Routes/authRoutes.js';  // Auth routes for login
import videoRoutes from './Routes/videoRoutes.js';  // Video routes for video-related operations

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors());

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (login, signup, etc.)
app.use('/api/videos', videoRoutes);  // Video routes (video creation, fetching, etc.)

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/video_platform', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));
