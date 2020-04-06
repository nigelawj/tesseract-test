const express = require('express');
const router = express.Router();

// @route			GET api/auth
// @desc			Dummy home page
// @access		Public
router.get('/', async (req, res) => {
  res.write('lol.');
  return res.status(200).end();
});

module.exports = router;
