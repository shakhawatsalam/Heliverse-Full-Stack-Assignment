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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_servece_1 = require("./user.servece");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const user_constant_1 = require("./user.constant");
const paginationConstants_1 = require("../../../constants/paginationConstants");
// * Create User
const createUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const UserData = __rest(req.body, []);
    const result = yield user_servece_1.userService.createUser(UserData);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "User Created successfully",
      data: result,
    });
  }),
);
//* get all User
const getAllUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(
      req.query,
      user_constant_1.UserFilterableFields,
    );
    const paginationOptions = (0, pick_1.default)(
      req.query,
      paginationConstants_1.paginationFields,
    );
    const result = yield user_servece_1.userService.getAllUser(
      filters,
      paginationOptions,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "User retrieved successfully",
      meta: result === null || result === void 0 ? void 0 : result.meta,
      data: result === null || result === void 0 ? void 0 : result.data,
    });
  }),
);
// * Get Single User
const getSingleUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_servece_1.userService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  }),
);
// * Update Single User
const updateSingleUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const upDatedData = req.body;
    const result = yield user_servece_1.userService.updateSingleUser(
      id,
      upDatedData,
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  }),
);
// * Get Single User
const deleteSingleUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_servece_1.userService.deleteSingleUser(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: "User Deleted successfully",
      data: result,
    });
  }),
);
exports.userController = {
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createUser,
};
