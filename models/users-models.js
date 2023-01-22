const db = require("../db/connection");

exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows: users }) => {
    return users;
  });
};

exports.fetchUserName = (username) => {
  return db
    .query(`SELECT * FROM users WHERE username = $1;`, [username])
    .then((user) => {
      return user.rows[0];
    });
};
