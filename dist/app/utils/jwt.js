"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToke = exports.refreshTokenOptions = exports.accessTokenOptions = void 0;
const config_1 = __importDefault(require("../config"));
const redis_1 = require("../redis");
// * parse environment variables to intergrates with fallback values
const accessTokenExpire = parseInt(config_1.default.access_token_expire || "300", 10);
const refreshTokenExpire = parseInt(config_1.default.refresh_token_expire || "300", 10);
// * 🍪🍪 Options for Cookies 🍪🍪
exports.accessTokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
};
const sendToke = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    // * upload session to Redis
    redis_1.redis.set(user._id, JSON.stringify(user));
    // * parse environment variables to intergrates with fallback values
    const accessTokenExpire = parseInt(config_1.default.access_token_expire || "300", 10);
    const refreshTokenExpire = parseInt(config_1.default.refresh_token_expire || "300", 10);
    // * 🍪🍪 Options for Cookies 🍪🍪
    const accessTokenOptions = {
        expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
        maxAge: accessTokenExpire * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
    };
    const refreshTokenOptions = {
        expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
        maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
    };
    // * only set secure to true in production
    if (config_1.default.node_env === "production") {
        accessTokenOptions.secure = true;
    }
    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
    });
};
exports.sendToke = sendToke;
