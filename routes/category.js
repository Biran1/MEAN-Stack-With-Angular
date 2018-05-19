const Category = require('../models/category'); // Import Category Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  /* ===============================================================
     GET ALL Categories
  =============================================================== */
  router.get('/allCategories', (req, res) => {
    // Search database for all categories
    Category.find({}, (err, categories) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if categories were found in database
        if (!categories) {
          res.json({ success: false, message: 'No category found.' }); // Return error of no categories found
        } else {
          res.json({ success: true, categories: categories }); // Return success and categories array
        }
      }
    }).sort({ '_id': -1 }); // Sort categories from newest to oldest
  });

  /* ===============================================================
   GET SINGLE Category
=============================================================== */

  router.get('/singleCategory/:id', (req, res) => {
    // Check if id is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No category ID was provided.' }); // Return error message
    } else {
      // Check if the category id is found in database
      Category.findOne({ _id: req.params.id }, (err, category) => {
        // Check if the id is a valid ID
        if (err) {
          res.json({ success: false, message: 'Not a valid category id' }); // Return error message
        } else {
          // Check if category was found by id
          if (!category) {
            res.json({ success: false, message: 'Category not found.' }); // Return error message
          }
          else {
            res.json({ success: true, category: category }); // Return success
          }
        }
      });
    }
  });
  
      return router;
    };
