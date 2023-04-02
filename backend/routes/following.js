const express = require('express');
const router = express.Router();
const following = require('../controllers/followingController');

router.post('/get',following.getFollowing);
router.post('/add',following.addFollowing);
router.post('/remove',following.removeFollowing);    

module.exports = router;