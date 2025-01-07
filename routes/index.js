const router = require("express").Router();
const userRouter = require("./users");
const videoRouter = require("./videoCard");
const {
  validateUserLogin,
  validateNewUser,
} = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const dataRouter = require("./data");

router.use("/api", dataRouter);
router.use("/users", userRouter);
router.use("/mvids", videoRouter);
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateNewUser, createUser);

module.exports = router;
