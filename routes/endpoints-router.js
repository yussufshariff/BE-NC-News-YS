const { getAPIinfo } = require("../controllers/endpoint.controllers");
const router = require("express").Router();

router.get("/api/", getAPIinfo);

module.exports = router;
