import Comment from '../Models/Comments.js';

// ✅ Add a Comment
const addComment = async (req, res) => {
  try {
    const { videoId, userId, text } = req.body;

    if (!videoId || !userId || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({ videoId, user: userId, text });
    await newComment.save();

    return res.status(201).json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ error: "Server error while adding comment" });
  }
};

// ✅ Fetch Comments for a Video (route parameter `/video/:videoId`)
const getCommentsByVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId) {
      return res.status(400).json({ error: "Missing videoId" });
    }

    const comments = await Comment.find({ videoId }).populate('user', 'username').sort({ timestamp: -1 });

    return res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Server error while fetching comments" });
  }
};

// ✅ Export the controllers
export default {
  addComment,
  getCommentsByVideo
};
