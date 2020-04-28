'use strict';
// require('dotenv').config();
const http = require('http');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

// keys
// const SAMPLE_API_KEY = 'rtgwq'

const app = express();

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
  console.log('unhandledRejection:', err);
});


if (!module.parent) {
  startServer();
}

const serverHandlers = {
  startServer,
  destroyServer,
};

module.exports = serverHandlers;
