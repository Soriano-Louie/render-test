/* eslint-disable @stylistic/js/semi */
/* eslint-disable @stylistic/js/quotes */
/* eslint-disable no-undef */
require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;

module.exports = { MONGODB_URI, PORT };
