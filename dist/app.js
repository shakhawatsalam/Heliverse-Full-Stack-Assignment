"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHnadler_1 = __importDefault(require("./app/middleware/globalErrorHnadler"));
const http_status_1 = __importDefault(require("http-status"));
// cors
app.use((0, cors_1.default)({ credentials: true }));
// perser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.use("/api/", routes_1.default);
app.get("/", (req, res) => {
    res.send("Hello Heliverse");
});
// Global Error Handler
app.use(globalErrorHnadler_1.default);
// handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not found",
        errorMessages: [
            {
                path: req.originalUrl,
                message: " API Not found",
            },
        ],
    });
    next();
});
exports.default = app;
