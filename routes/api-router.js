const apiRouter = require("express").Router();

apiRouter.get("/", (request, response) => {
  response.status(200).send("All OK from API Router");
});

module.exports = apiRouter;
