const db = require("../db/connection");
const articles = require("../db/data/test-data/articles");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows: topics }) => {
    return topics;
  });
};
exports.fetchArticles = () => {
  return db
    .query(
      `SELECT articles.* , COUNT(comments.article_id) AS comment_count FROM articles 
      LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.created_at DESC
      `
    )
    .then(({ rows: articles }) => {
      return articles;
    });
};

exports.fetchArticlesByID = (article_id) => {
  const query = `SELECT * FROM articles WHERE articles.article_id =$1`;
  return db.query(query, [article_id]).then(({ rows: articles }) => {
    return articles;
  });
};
