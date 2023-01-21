const express = require("express");

const apiRouter = require("../routes/endpoints-router");
const articlesRouter = require("../routes/articles-router");
const usersRouter = require("../routes/users-router");
const topicsRouter = require("../routes/topics-router");
const commentsRouter = require("../routes/comments-router");
const {
  customErrors,
  psqlErrors,
  InternalServerError,
  NotFoundErrors,
} = require("../errors");

const app = express();

app.use(express.json());

app.use(apiRouter);
app.use(usersRouter);
app.use(articlesRouter);
app.use(topicsRouter);
app.use(commentsRouter);

app.use(customErrors);
app.use(psqlErrors);
app.use(InternalServerError);
app.use(NotFoundErrors);

module.exports = { app };
