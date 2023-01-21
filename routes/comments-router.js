const { removeComment } = require("../controllers/controllers");

const router = require("express").Router();

router.delete("/api/comments/:id", removeComment);

module.exports = router;
