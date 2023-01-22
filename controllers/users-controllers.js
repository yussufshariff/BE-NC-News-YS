const { fetchUsers, fetchUserName } = require("../models/users-models");

exports.getAllUsers = (request, response, next) => {
  fetchUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getUserName = (request, response, next) => {
  const { username } = request.params;
  fetchUserName(username)
    .then((user) => {
      response.status(200).send({ user });
    })
    .catch((error) => {
      next(error);
    });
};
