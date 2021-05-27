const mongoose = require('mongoose');
const {Schema} = mongoose;

const pagSchema = new Schema({
    Rows: String
});

module.exports = mongoose.model('paginations', pagSchema);