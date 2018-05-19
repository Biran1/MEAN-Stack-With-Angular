const Group = require('../models/group'); // Import Group Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {

  /* ===============================================================
     GET ALL Groups By Sub Category
  =============================================================== */



  router.get('/getAllGroupsBySubCategory/:subCategory', (req, res) => {
    // Check if subCategory is present in parameters
    if (!req.params.subCategory) {
      res.json({ success: false, message: 'No subCategory was provided.' }); // Return error message
    } else {
      // Check if the sub Category is found in database
      Group.find({ subCat: req.params.subCategory }, (err, groups) => {
        // Check if the subCategory is a valid subCategory
        if (err) {
          res.json({ success: false, message: 'Not a valid sub Category' }); // Return error message
        } else {
          // Check if groups was found by subCategory
          if (!groups) {
            res.json({ success: false, message: 'groups not found.' }); // Return error message
          }
          else {
            res.json({ success: true, groups: groups }); // Return success
          }
        }
      });
    }
  });

  /* ===============================================================
   GET SINGLE Category
=============================================================== */

/*   router.get('/singleCategory/:id', (req, res) => {
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
  }); */
  
      return router;
    };
