const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/me', protect, userController.getProfile);
router.put('/me', protect, upload.single('profileImage'), userController.updateProfile);
router.get('/', protect, userController.getUsers);
router.delete('/me/image', protect, userController.removeProfileImage);
router.delete('/:id', protect, authorize('admin'), userController.deleteUser);

module.exports = router;
