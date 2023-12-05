"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/ban-types */
class globalErrorHandler extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
exports.default = globalErrorHandler;
