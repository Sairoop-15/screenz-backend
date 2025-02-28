import Video from '../Models/Video.js';
import User from '../Models/User.js';
import axios from 'axios';

const API_KEY =  'AIzaSyCNh536lWro6s49tW2bQ_caiKcVrX1RvU8'; 

const extractVideoDetails = async (videoUrl) => {
  const videoIdMatch = videoUrl.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (!videoIdMatch) throw new Error('Invalid YouTube URL');

  const videoId = videoIdMatch[1];
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;
  
  const response = await axios.get(youtubeUrl);
  const videoData = response.data.items[0]?.snippet;
  if (!videoData) throw new Error('Failed to fetch video details');

  return {
    videoId,
    title: videoData.title,
    description: videoData.description,
    thumbnail: videoData.thumbnails.high.url,
  };
};

const createVideo = async (req, res) => {
  try {
    const { videoUrl, uploadedBy } = req.body;
    const user = await User.findOne({ username: uploadedBy });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { title, description, thumbnail, videoId } = await extractVideoDetails(videoUrl);
    const newVideo = new Video({ title, description, videoUrl, videoId, uploadedBy: user._id, thumbnail });

    await newVideo.save();
    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    res.status(500).json({ message: 'Error creating video', error: error.message });
  }
};

const getVideoId = async (req, res) => {
  try {
    const { videoUrl } = req.query;
    if (!videoUrl) {
      return res.status(400).json({ message: 'Missing videoUrl query parameter' });
    }

    const video = await Video.findOne({ videoUrl });
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ _id: video._id });
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('uploadedBy', 'username');
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id).populate('uploadedBy', 'username');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    return res.status(200).json(video);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching video', error: error.message });
  }
};

const getVideosByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const videos = await Video.find({ uploadedBy: user._id });
    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching videos', error: error.message });
  }
};

export default {
  createVideo,
  getAllVideos,
  getVideoById,
  getVideosByUser,
  getVideoId
};
