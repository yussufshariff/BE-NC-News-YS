const router = require("express").Router();

const {
  getAllArticles,
  getArticlesByID,
  getComments,
  addComment,
  updateVotes,
} = require("../controllers/controllers");

router.get("/api/articles", getAllArticles);
router.get("/api/articles/:article_id", getArticlesByID);
router.get("/api/articles/:article_id/comments", getComments);
router.post("/api/articles/:article_id/comments", addComment);
router.patch("/api/articles/:article_id", updateVotes);

module.exports = router;
