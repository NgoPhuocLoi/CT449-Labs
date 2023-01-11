const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const ApiError = require("./helpers/api-error");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.use((_req, _res, next) => {
  return next(new ApiError(404, "Resource not found"));
});
app.use((error, _req, res, _next) => {
  console.log(error);
  return res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
