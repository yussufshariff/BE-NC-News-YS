const { request, response } = require("express");
const express = require("express");
const app = express();
const {
  getAllTopics,
  getAllArticles,
  getArticlesByID,
  getComments,
  addComment,
  updateVotes,
  getAllUsers,
} = require("../controllers/controllers");
app.use(express.json());

app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticlesByID);
app.get("/api/articles/:article_id/comments", getComments);
app.post("/api/articles/:article_id/comments", addComment);
app.patch("/api/articles/:article_id", updateVotes);
app.get("/api/users", getAllUsers);

app.use((error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
});

app.use((error, request, response, next) => {
  if (
    error.code === "23503" ||
    error.code === "23502" ||
    error.code === "22P02"
  ) {
    response.status(400).send({ msg: "Bad Request" });
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
