import Video from '../Models/Video.js';
import User from '../Models/User.js';
import axios from 'axios';

const API_KEY = 'AIzaSyCNh536lWro6s49tW2bQ_caiKcVrX1RvU8'; // Replace with your actual API key

// Extract details from YouTube video URL
const extractVideoDetails = async (videoUrl) => {
  // Extract video ID from URL
  const videoId = videoUrl.split('v=')[1]?.split('&')[0];
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }

  // YouTube API endpoint for video details
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
  const response = await axios.get(youtubeUrl);
  
  const videoData = response.data.items[0]?.snippet;
  
  if (!videoData) {
    throw new Error('Failed to fetch video details from YouTube');
  }

  return {
    title: videoData.title,
    description: videoData.description,
    thumbnail: videoData.thumbnails.high.url,
  };
};

// Create a new video
const createVideo = async (req, res) => {
  try {
    const { videoUrl, uploadedBy } = req.body;

    // Validate the user exists
    const user = await User.findOne({ username: uploadedBy });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Extract YouTube video details
    const { title, description, thumbnail } = await extractVideoDetails(videoUrl);

    // Create a new Video object and save to the database
    const newVideo = new Video({
      title,
      description,
      videoUrl,
      uploadedBy: user._id,
      thumbnail,
    });

    await newVideo.save();
    return res.status(201).json({ message: 'Video created successfully', video: newVideo });
  } catch (error) {
    console.error(error); // Log the error for better debugging
    return res.status(500).json({ message: 'Failed to create video', error: error.message });
  }
};

// Get all videos
const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('uploadedBy', 'username');
    return res.status(200).json(videos);
  } catch (error) {
    console.error(error); // Log the error for better debugging
    return res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};

// Get videos by username
const getVideosByUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Validate username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch videos uploaded by the user
    const videos = await Video.find({ uploadedBy: user._id });
    return res.status(200).json(videos);
  } catch (error) {
    console.error(error); // Log the error for better debugging
    return res.status(500).json({ message: 'Failed to fetch videos', error: error.message });
  }
};

export default { createVideo, getAllVideos, getVideosByUser };
