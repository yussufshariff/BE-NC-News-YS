const { getAPIinfo } = require("../controllers/controllers");
const router = require("express").Router();

router.get("/api/", getAPIinfo);

module.exports = router;
