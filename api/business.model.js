const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Business = new Schema({
    gift_voucher_name: {
        type: String
    },
    gift_voucher_code: {
        type: String
    },
    gift_voucher_price: {
        type: Number
    },
    gift_voucher_release_date: {
        type: Date
    },
    gift_voucher_expire_date: {
        type: Date
    },
    gift_voucher_issue_or_not: {
        type: String
    }
},{
    collection: 'business'
});

module.exports = mongoose.model('Business', Business);