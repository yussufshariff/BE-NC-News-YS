const express = require("express");
const app = express();
const { getAllTopics } = require("../controllers/controllers");

app.get("/api/topics", getAllTopics);

app.use((error, request, response, next) => {
  if (error.status && error.msg) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
});
app.use((request, response) => {
  response.status(404).send({ msg: "URL not found" });
});
app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send({ msg: "Internal Server Error" });
});
module.exports = { app };
