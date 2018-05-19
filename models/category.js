/* ===================
   Import Node Modules
=================== */
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Category Model Definition
const categorySchema = new Schema({
    catName: { type: String},
    subCat: [{
        subCatName: { type: String }
    }]
  });

// Export Module/Schema
module.exports = mongoose.model('Category', categorySchema);
