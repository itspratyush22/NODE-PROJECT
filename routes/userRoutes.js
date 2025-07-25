const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController'); 

router.post('/create', userController.createUser); 
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.get('/:id/notifications', userController.getNotifications);

module.exports = router;
