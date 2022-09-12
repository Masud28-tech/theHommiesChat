const {sendMessage, getAllMessages, deleteAllMessages} = require('../controllers/messageController');

const router = require('express').Router();

router.post('/sendMessage', sendMessage);
router.post('/getAllMessages', getAllMessages);
router.post('/deleteAllMessages', deleteAllMessages);

module.exports = router;