const express = require('express');
const router = express.Router();

const os = require('os');

// @ts-ignore
const tesseract = require('node-tesseract-ocr');
const { check, validationResult } = require('express-validator');

// Pulls configs from a central config location
// Location is meant to be a central folder for all nodes in the network

// @ts-ignore
const config = require('config');

// Change config directory as required; Ensure config json name matches os.hostname()
// REMEMBER TO ESCAPE SLASHES
process.env.NODE_CONFIG_DIR =
  '\\\\DESKTOP-RPP633O\\d$\\Code\\search-engine\\search-engine-120220\\indexer\\analytics\\config';

// DEFAULT TESSERACT CONFIG
const tsrConfig = config.get('tsrConfig');

// COUNTER
var counter = 0;

// @route			POST api/auth
// @desc			Feed filepath to API for Tesseract
// @access		Public
router.post(
  '/',
  // express-validator checks
  [
    check('filepath', 'Filename Empty.')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    // express-validator errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If filename is not passed in
      return res.status(400).json({
        errors: errors.array()
      });
    }

    // Destructure filename from req.body
    var { filepath } = req.body;
    filepath = `"${filepath}"`; // add extra quotation marks to escape spaces
    try {
      await tesseract
        .recognize(filepath, tsrConfig)
        .then(text => {
          text = text.replace(/[\r\n\t\f]/gm, ' ');
          console.log('Result:', text);
          counter++;
          console.log(`\nImages Processed: ${counter}\n`);
          res.json(text);
        })
        .catch(err => {
          console.log(err.message);
        });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route			GET api/auth
// @desc			Dummy page for test
// @access		Public
router.get('/', async (req, res) => {
  res.write(`HELLO FROM ${os.hostname()}`);
  return res.status(200).end();
});

module.exports = router;
