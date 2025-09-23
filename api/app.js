"use strict"

require('dotenv').config();

const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors')
const PORT = Number(process.env.PORT);

app.use(express.json());
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (origin.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/', routes);

const server = app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

