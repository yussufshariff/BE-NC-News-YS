const {
  fetchTopics,
  fetchArticles,
  fetchArticlesByID,
  fetchComments,
  postComments,
  alterVotes,
} = require("../models/models");

exports.getAllTopics = (request, response, next) => {
  fetchTopics()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getAllArticles = (request, response, next) => {
  fetchArticles()
    .then((topics) => {
      response.status(200).send({ topics });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getArticlesByID = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticlesByID(article_id)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch(next);
};

exports.getComments = (request, response, next) => {
  const { article_id } = request.params;
  fetchArticlesByID(article_id)
    .then(() => {
      return fetchComments(article_id);
    })
    .then((comments) => {
      response.status(200).send({ comments: comments });
    })
    .catch(next);
};

exports.addComment = (request, response, next) => {
  const { article_id } = request.params;
  const { body, username } = request.body;
  fetchArticlesByID(article_id)
    .then(() => {
      return postComments(username, body, article_id);
    })
    .then((newComment) => {
      response.status(201).send({ newComment });
    })
    .catch(next);
};

exports.updateVotes = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  fetchArticlesByID(article_id)
    .then(() => {
      return alterVotes(article_id, inc_votes);
    })
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch(next);
};
