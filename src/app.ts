import express, { Application } from "express";
import cors from "cors";
const app: Application = express();
import routers from "./app/routes";

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

export default app;
