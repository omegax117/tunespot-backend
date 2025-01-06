require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { errorHandler } = require("./middlewares/error-handler");
const mainRouter = require("./routes/index");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter } = require("./middlewares/rateLimit");

const { MONGOOSE = "mongodb://127.0.0.1:27017/tunespotDB" } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

mongoose
  .connect(MONGOOSE)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.use(express.json());
app.use(cors());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "example.com"],
      },
    },
  })
);

app.use(limiter);
app.use("/", mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      `Server is Successfully Running, and App is listening on port ${PORT}`
    );
  } else console.log("Error occurred, server can't start", error);
});
