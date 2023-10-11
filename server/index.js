const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);



import { PORT } from "./config.js";





server.listen(PORT, () => {
    console.log('listening on:', PORT);
  });
