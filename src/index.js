const express = require("express");
require("./db/mongoose");
const userRouter = require("./router/user");
const todoRouter = require("./router/todo");

const port = 3000;
const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/todos", todoRouter);

app.use((err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  const handledErr = err.statusCode < 500;
  res
    .status(err.statusCode)
    .send({ message: handledErr ? err.message : "some thing wrong" });
  debugger;
});

app.listen(port, () => {
  console.log("App is running on port " + port);
});
