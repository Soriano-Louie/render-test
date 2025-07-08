/* eslint-disable @stylistic/js/semi */
/* eslint-disable @stylistic/js/quotes */
/* eslint-disable no-undef */
const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
// This module provides middleware functions for logging requests, handling unknown endpoints, and managing errors in an Express application.
// - `requestLogger`: Logs the HTTP method, path, and body of incoming requests.
// - `unknownEndpoint`: Responds with a 404 status and an error message for unknown endpoints.
// - `errorHandler`: Catches errors, logs them, and sends appropriate responses based on
