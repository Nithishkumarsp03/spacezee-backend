import express from "express";
import cors from "cors";
import notFound from "./app/middleware/notfound.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import router from "./app/routes/routes.js";

const app = express();

//parsers

app.use(express.json());

const allowedOrigins = ["http://34.235.0.131", "http://34.235.0.131:5000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// application routes
app.use("/api/", router);

app.get("/api", (req, res) => {
  res.send("Api running");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
