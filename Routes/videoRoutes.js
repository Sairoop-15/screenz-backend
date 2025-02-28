import express from 'express';
import videoController from '../Controllers/videoController.js';

const router = express.Router();

router.get('/getVideoId', videoController.getVideoId); // ✅ Fix: Matches frontend
router.post('/create', videoController.createVideo);
router.get('/', videoController.getAllVideos);
router.get('/user/:username', videoController.getVideosByUser);
router.get('/:id', videoController.getVideoById);  // ✅ Keep this at the end

export default router;
