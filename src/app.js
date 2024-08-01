import express from "express";
import cors from "cors";
import notFound from "./app/middleware/notfound.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import router from "./app/routes/routes.js";

const app = express();

//parsers
const URL = "https://sl-il.netlify.app";
const dev = "http://localhost:5173";
app.use(express.json());
app.use(cors({ origin: URL, credentials: true }));

// application routes
app.use("/api/", router);

app.get("/api", (req, res) => {
  res.send("Api running");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
