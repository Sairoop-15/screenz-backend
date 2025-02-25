import express from 'express';
import videoController from '../Controllers/videoController.js';  // Import default export
const router = express.Router();

router.post('/create', videoController.createVideo);  // Use the default exported function
router.get('/videos', videoController.getAllVideos);  // Use the default exported function
router.get('/user/:username', videoController.getVideosByUser);  // Use the default exported function
router.get('/', videoController.getAllVideos);

export default router;
