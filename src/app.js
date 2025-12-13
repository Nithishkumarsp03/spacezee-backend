import express from "express";
import cors from "cors";
import notFound from "./app/middleware/notfound.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import router from "./app/routes/routes.js";
import path from "path";

const app = express();

//parsers

app.use(express.json());

const allowedOrigins = [
  "*",
  "https://sltl.netlify.app",
  "https://fxlearning.ai",
  "http://localhost:5173"
];

app.use("/images", express.static(path.join(process.cwd(), "public")));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
console.log("Runnnig")

// application routes
app.use("/api/", router);

app.get("/api", (req, res) => {
  res.send("Api running");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
