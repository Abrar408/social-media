const express = require('express');
const router = express.Router();
const userList = require('../controllers/userListController');

router.post('/get',userList.getUserList);

module.exports = router;