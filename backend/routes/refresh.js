const express = require('express');
const router = express.Router();
const refreshokenController = require('../controllers/refreshTokenController');

router.route('/')    
    .get(refreshokenController.handleRefreshToken)
    

module.exports = router;