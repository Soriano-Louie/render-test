/* eslint-disable @stylistic/js/semi */
/* eslint-disable no-undef */
const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

module.exports = { info, error };
// This module provides a simple logging utility with two functions: info and error.
// The info function logs messages to the console, while the error function logs error messages.
// This can be useful for debugging and tracking application behavior.
