"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = __importDefault(
  require("../../middleware/validateRequest"),
);
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post(
  "/",
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.createUserZodSchema,
  ),
  user_controller_1.userController.createUser,
);
router.get("/", user_controller_1.userController.getAllUser);
router.get("/:id", user_controller_1.userController.getSingleUser);
router.put(
  "/:id",
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.updateUserZodSchema,
  ),
  user_controller_1.userController.updateSingleUser,
);
router.delete("/:id", user_controller_1.userController.deleteSingleUser);
exports.UserRoute = router;
