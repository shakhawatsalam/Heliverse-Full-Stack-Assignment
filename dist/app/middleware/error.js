"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const globalErrorHandler_1 = __importDefault(require("../utils/globalErrorHandler"));
const ErrorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // * wrong mongoDb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new globalErrorHandler_1.default(message, 400);
    }
    // * Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} endred`;
        err = new globalErrorHandler_1.default(message, 400);
    }
    // * Wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web token is invalid, try again`;
        err = new globalErrorHandler_1.default(message, 400);
    }
    // * Jwt Expire error
    if (err.name === "TokenExpiredError") {
        const message = `Json web toke is expired, tye again`;
        err = new globalErrorHandler_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.ErrorMiddleware = ErrorMiddleware;
