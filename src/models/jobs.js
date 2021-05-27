const mongoose = require('mongoose');
const {Schema} = mongoose;

const jobsSchema = new Schema({
    Tittle: String,
    Company: String,
    Type: String,
    Location: String,
    Category: String,
    Description: String,
    HowToApply: String,
    Email: String
});

module.exports = mongoose.model('jobs', jobsSchema);