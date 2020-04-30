'use strict';
require('dotenv').config();
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

// env keys
const TMP_FILE_DIR = process.env.TMP_FILE_DIR

const app = express();

/**
 * On boot, one time attempt to sychronously create tmp directory for file uploads
 */
try {
  const tmpDirExists = fs.existsSync(TMP_FILE_DIR)
  // console.log('app start: tmpDirExists:', tmpDirExists);
  if (!tmpDirExists) {
    console.log('app start: make tmp dir')
    fs.mkdirSync(TMP_FILE_DIR)
  }
} catch (e) {
  // do nothing
}

// to secure the headers
app.use(helmet())

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

// Express settings
const serverPort = 3300;
app.set('port', serverPort);

// CORS
app.use(cors({
  credentials: true,
  origin: function(origin, callback){
    return callback(null,true)
  },
  optionsSuccessStatus: 200
}));
// app.all('/*', (req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Request-Headers', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Headers, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET, POST');
//   if(req.method === 'OPTIONS') {
//     res.writeHead(200);
//     res.end();
//   } else {
//     next();
//   }
// });

// Router
app.use('/api/v1', require('./routes/v1'));

// Start server
const startServer = (p) => {
  const port = p || app.get('port');
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log(`server started on port: ${port}`);
  });
  return server;
};

// Destroy server
const destroyServer = (server) => {
  server.close(() => {
    console.log('closing out the server');
    process.exit(0);
  });
};

// catch uncaughtException/unhandledRejection errors
process.on('uncaughtException', (err) => {
  console.error('uncaughtException:', err);
});
process.on('unhandledRejection', (err) => {
  console.error('unhandledRejection:', err);
});


if (!module.parent) {
  startServer();
}

const serverHandlers = {
  startServer,
  destroyServer,
};

module.exports = serverHandlers;
