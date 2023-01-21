const { getAllUsers } = require("../controllers/users-controllers");

const router = require("express").Router();

router.get("/api/users", getAllUsers);

module.exports = router;
