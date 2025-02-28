import express from 'express';
import commentController from '../Controllers/Comments.js'; // Ensure the correct path

const router = express.Router();

router.post('/', commentController.addComment);  // ✅ POST /api/comments/
router.get('/video/:videoId', commentController.getCommentsByVideo);  // ✅ GET /api/comments/video/:videoId

export default router;
