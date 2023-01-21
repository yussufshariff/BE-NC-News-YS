const { getAllTopics } = require("../controllers/controllers");

const router = require("express").Router();

router.get("/api/topics", getAllTopics);

module.exports = router;
