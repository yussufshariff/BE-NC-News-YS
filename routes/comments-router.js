const {
  removeComment,
  getComments,
  addComment,
} = require("../controllers/comments-controller");

const router = require("express").Router();

router.get("/api/articles/:article_id/comments", getComments);
router.delete("/api/comments/:comment_id", removeComment);
router.post("/api/articles/:article_id/comments", addComment);

module.exports = router;
