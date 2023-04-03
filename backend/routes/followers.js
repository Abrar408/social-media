const express = require('express');
const router = express.Router();
const followers = require('../controllers/followersController');

router.post('/get',followers.getFollowers);   

module.exports = router;