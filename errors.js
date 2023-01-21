const customErrors = (error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
};

const psqlErrors = (error, request, response, next) => {
  if (
    error.code === "23503" ||
    error.code === "23502" ||
    error.code === "22P02"
  ) {
    response.status(400).send({ msg: "Bad Request" });
  } else {
    next(error);
  }
};

const NotFoundErrors = (request, response, next) => {
  response.status(404).send({ msg: "URL not found" });
};
const InternalServerError = (error, request, response, next) => {
  console.log(error);
  response.status(500).send({ msg: "Internal Server Error" });
};

module.exports = {
  customErrors,
  psqlErrors,
  NotFoundErrors,
  InternalServerError,
};
