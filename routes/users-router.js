const { getAllUsers } = require("../controllers/controllers");

const router = require("express").Router();

router.get("/api/users", getAllUsers);

module.exports = router;
