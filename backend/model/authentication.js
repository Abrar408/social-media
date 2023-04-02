const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    allowedUsers:{
        type: Number,
        required: true
    },
    rechargeID:{
        type: String,
        required: true
    },
    expiryDate:{
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('Auth', authSchema);