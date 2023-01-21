const router = require("express").Router();

const {
  getAllArticles,
  getArticlesByID,
  updateVotes,
} = require("../controllers/articles-controllers");

router.get("/api/articles", getAllArticles);
router.get("/api/articles/:article_id", getArticlesByID);
router.patch("/api/articles/:article_id", updateVotes);

module.exports = router;
