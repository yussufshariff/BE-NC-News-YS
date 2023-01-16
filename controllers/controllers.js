const topics = require("../db/data/test-data/topics");
const { fetchTopics, fetchArticles } = require("../models/models");

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
