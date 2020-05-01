const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/node-smart", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
