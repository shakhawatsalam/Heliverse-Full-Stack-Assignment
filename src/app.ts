import express, { Application } from "express";
import cors from "cors";
const app: Application = express();

// cors
app.use(cors({ credentials: true }));

// perser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Heliverse");
});

export default app;
