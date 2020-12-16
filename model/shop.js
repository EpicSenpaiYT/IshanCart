const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const prod_Schema = mongoose.Schema({


    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})


module.exports = mongoose.model('Product', prod_Schema);


