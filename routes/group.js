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
     GET ALL Groups By Sub Category
  =============================================================== */



  router.get('/getGroupByGroupID/:id', (req, res) => {
    // Check if groupID is present in parameters
    if (!req.params.id) {
      res.json({ success: false, message: 'No groupID was provided.' }); // Return error message
    } else {
      // Check if the groupID is found in database
      Group.findOne({ _id: req.params.id }, (err, group) => {
        // Check if the group is a valid group
        if (err) {
          res.json({ success: false, message: 'Not a valid groupID' }); // Return error message
        } else {
          // Check if group was found by groupID
          if (!group) {
            res.json({ success: false, message: 'group not found.' }); // Return error message
          }
          else {
            res.json({ success: true, group: group }); // Return success
          }
        }
      });
    }
  });

  /* ==============
     Register Route
  ============== */
  router.post('/saveGroup', (req, res) => {
    // Check if groupName was provided
    if (!req.body.groupName) {
      res.json({ success: false, message: 'You must provide an groupName' }); // Return error
    } else {
      // Check if groupDesc was provided
      if (!req.body.groupDesc) {
        res.json({ success: false, message: 'You must provide a groupDesc' }); // Return error
      } else {
        // Check if subCategory was provided
        if (!req.body.subCategory) {
          res.json({ success: false, message: 'You must provide a subCategory' }); // Return error
        } else {
          // Check if userName was provided
          if (!req.body.userName) {
            res.json({ success: false, message: 'You must provide a userName' }); // Return error
          } else {
            // Create new Group object and apply group input
            let group = new Group({
              groupName: req.body.groupName,
              groupDesc: req.body.groupDesc,
              subCat: req.body.subCategory,
              users: req.body.userName
            });
            // Save group to database
            group.save((err,item) => {
              // Check if error occured
              if (err) {
                // Check if error is a validation error
                if (err.errors) {
                  // Check if validation error is in the groupName field
                  if (err.errors.groupName) {
                    res.json({ success: false, message: err.errors.groupName.message }); // Return error
                  } else {
                    // Check if validation error is in the groupDesc field
                    if (err.errors.groupDesc) {
                      res.json({ success: false, message: err.errors.groupDesc.message }); // Return error
                    } else {
                      // Check if validation error is in the subCat field
                      if (err.errors.subCat) {
                        res.json({ success: false, message: err.errors.subCat.message }); // Return error
                      } else {
                        // Check if validation error is in the users field
                        if (err.errors.users) {
                          res.json({ success: false, message: err.errors.users.message }); // Return error
                        } else {
                          res.json({ success: false, message: err }); // Return any other error not already covered
                        }
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save group. Error: ', err }); // Return error if not related to validation
                }
              } else {
                res.json({ success: true, message: item._id }); // Return success
              }
            });
          }
        }
      }
    }
  });

  return router;
};
