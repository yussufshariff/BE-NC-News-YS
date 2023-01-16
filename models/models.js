const db = require("../db/connection");
const topics = require("../db/data/test-data/topics");

exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows: topics }) => {
    return topics;
  });
};
