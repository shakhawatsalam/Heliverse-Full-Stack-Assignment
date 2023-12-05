"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.isAuthenticated = void 0;
const catchAsyncErrors_1 = require("./catchAsyncErrors");
const globalErrorHandler_1 = __importDefault(
  require("../../utils/globalErrorHandler"),
);
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redis_1 = require("../../redis");
const user_controller_1 = require("../models/user/user.controller");
// * authenticated user
exports.isAuthenticated = (0, catchAsyncErrors_1.CatchAsyncError)(
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      const access_token = req.cookies.access_token;
      if (!access_token) {
        return next(
          new globalErrorHandler_1.default(
            "User is Not Authenticated",
            http_status_1.default.UNAUTHORIZED,
          ),
        );
      }
      const decoded = jsonwebtoken_1.default.decode(access_token);
      if (!decoded) {
        return next(
          new globalErrorHandler_1.default("access token is not valid", 400),
        );
      }
      // * check if the access token is expired
      if (decoded.exp && decoded.exp <= Date.now() / 1000) {
        try {
          yield user_controller_1.userController.updateAccessToken(
            req,
            res,
            next,
          );
        } catch (error) {
          return next(error);
        }
      } else {
        const user = yield redis_1.redis.get(decoded.id);
        if (!user) {
          return next(
            new globalErrorHandler_1.default(
              "Please login to access this resource",
              http_status_1.default.BAD_REQUEST,
            ),
          );
        }
      }
      const user = yield redis_1.redis.get(decoded.id);
      if (!user) {
        return next(
          new globalErrorHandler_1.default(
            "Please login to access this resource",
            http_status_1.default.BAD_REQUEST,
          ),
        );
      }
      req.user = JSON.parse(user);
      next();
    }),
);
// validate user role
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    var _a, _b;
    if (
      !roles.includes(
        ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) || "",
      )
    ) {
      return next(
        new globalErrorHandler_1.default(
          `Role: ${
            (_b = req.user) === null || _b === void 0 ? void 0 : _b.role
          } is not allowed to access this recourse`,
          http_status_1.default.FORBIDDEN,
        ),
      );
    } else {
      next();
    }
  };
};
exports.authorizeRole = authorizeRole;
