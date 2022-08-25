const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const docSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    csvfile: {
        type: String
    }
}, {
    collection: 'docs'
})
module.exports = mongoose.model('Doc', docSchema)