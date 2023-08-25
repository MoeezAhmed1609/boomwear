const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const path = require("path");
const compression = require('compression');

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 10000,
  })
);
app.use(fileUpload());
app.use(compression())

// Routes Imports
const products = require("./routes/productRoutes");
const users = require("./routes/userRoutes");
const orders = require("./routes/orderRoutes");
const blogs = require("./routes/blogRoutes");
const content = require("./routes/contentRoutes");

app.use("/api/v1", products);
app.use("/api/v1", users);
app.use("/api/v1", orders);
app.use("/api/v1", blogs);
app.use("/api/v1", content);

// Middleware for Error Handling
app.use(errorMiddleware);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

module.exports = app;
