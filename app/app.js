const express = require("express");
const app = express();
const {
  getAllTopics,
  getAllArticles,
  getAllArticlesByID,
} = require("../controllers/controllers");

app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getAllArticlesByID);

app.use((error, request, response, next) => {
  if (error.status && error.msg) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
});
app.use((request, response, next) => {
  response.status(404).send({ msg: "URL not found" });
});
app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send({ msg: "Internal Server Error" });
});
module.exports = { app };
