import express from "express";
import cors from "cors";
import notFound from "./app/middleware/notfound.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import router from "./app/routes/routes.js";

const app = express();

//parsers

app.use(express.json());
app.use(cors({ origin: "http://34.23.0.131", credentials: true }));

// application routes
app.use("/api/", router);

app.get("/api", (req, res) => {
  res.send("Api running");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
