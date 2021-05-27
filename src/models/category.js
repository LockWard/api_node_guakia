const mongoose = require('mongoose');
const {Schema} = mongoose;

const categSchema = new Schema({
    Category: String,
    Status: Boolean
});

module.exports = mongoose.model('categories', categSchema);