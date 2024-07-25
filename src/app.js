import express from "express";
import cors from "cors";
import notFound from "./app/middleware/notfound.js";
import globalErrorHandler from "./app/middleware/globalErrorHandler.js";
import router from "./app/routes/routes.js";

const app = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/", router);

app.get("/", (req, res) => {
  res.send("hello World");
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
