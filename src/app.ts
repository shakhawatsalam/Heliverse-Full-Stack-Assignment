import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
import routers from "./app/routes";
import globalErrorHandler from "./app/middleware/globalErrorHnadler";
import httpStatus from "http-status";

// cors
app.use(cors({ credentials: true }));

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/", routers);

app.get("/", (req, res) => {
  res.send("Hello Heliverse");
});

// Global Error Handler
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
