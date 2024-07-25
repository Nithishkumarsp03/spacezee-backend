import config from "./app/config.js";
import mongoose from "mongoose";
import app from "./app.js";

async function main() {
  try {
    await mongoose.connect(config.database_url);
    app.listen(config.port, () => {
      console.log(`Server Has started at ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("😈 unhandledRejection detected Server is shutting down ....");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("😈 uncaughtException detected Server is shutting down ....");
  process.exit(1);
});
