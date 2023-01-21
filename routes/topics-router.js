const { getAllTopics } = require("../controllers/topics-controllers");

const router = require("express").Router();

router.get("/api/topics", getAllTopics);

module.exports = router;
