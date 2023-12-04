import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("🚀🚀 Data base Connected Successfully");
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("failed to Connect", error);
  }
}

bootstrap();
