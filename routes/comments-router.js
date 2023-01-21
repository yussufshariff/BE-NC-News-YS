const { removeComment } = require("../controllers/controllers");

const router = require("express").Router();

router.delete("/api/comments/:comment_id", removeComment);

module.exports = router;
