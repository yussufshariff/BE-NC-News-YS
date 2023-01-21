const router = require("express").Router();

router.get("/", (request, response) => {
  response.status(200).send("All OK from API Router");
});

module.exports = router;
