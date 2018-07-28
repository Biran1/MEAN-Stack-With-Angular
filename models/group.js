/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Category Model Definition
const groupSchema = new Schema({
    groupName: { type: String },
    groupDesc: { type: String },
    subCat: { type: mongoose.Schema.Types.ObjectId },
    users: { type: Array }   
});

// Export Module/Schema
module.exports = mongoose.model('Group', groupSchema);
