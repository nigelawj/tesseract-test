const express = require('express');
const app = express();
const helmet = require('helmet');

const http = require('http');
//const https = require('https');
//const fs = require('fs');

const os = require('os');

// Pulls configs from a central config location
// Location is meant to be a central folder for all nodes in the network

// @ts-ignore
const config = require('config');

// Change config directory as required; Ensure config json name matches os.hostname()
// REMEMBER TO ESCAPE SLASHES
process.env.NODE_CONFIG_DIR =
  '\\\\DESKTOP-RPP633O\\d$\\Code\\search-engine\\search-engine-120220\\indexer\\analytics\\config';

// server config vars
// passed in via 'hostname'.json or argv; config values take precedence
// DEFAULT LOCALHOST:3000
var TSR_PORT, TSR_IP;

// sanity checks for correct config
if (config.hostname) {
  console.log(`${os.hostname()} loaded ${config.get('hostname')}.json!`);
  if (os.hostname() != config.get('hostname')) {
    console.log(`\n${os.hostname()} loaded wrong config.`);
    TSR_PORT = process.argv[2] || 3000;
    TSR_IP = process.argv[3] || '127.0.0.1';
  } else {
    let { port, ip } = config.get('settings');
    TSR_PORT = port;
    TSR_IP = ip;
  }
} else {
  console.log('\nConfig not found. No config loaded.');
  TSR_PORT = process.argv[2] || 3000;
  TSR_IP = process.argv[3] || '127.0.0.1';
}

// Middlewares
app.use(express.json({ extended: false }), helmet());

// ROUTES
app.use('/', require('./routes/tesseract.js'));

http.createServer(app).listen(TSR_PORT, TSR_IP, () => {
  console.log(`Server started on port ${TSR_PORT}, binded to ${TSR_IP}`);
});
