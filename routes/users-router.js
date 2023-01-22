const {
  getAllUsers,
  getUserName,
} = require("../controllers/users-controllers");

const router = require("express").Router();

router.get("/api/users", getAllUsers);
router.get("/api/users/:username", getUserName);

module.exports = router;
