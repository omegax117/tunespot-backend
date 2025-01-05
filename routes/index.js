const router = require("express").Router();
const userRouter = require("./users");
const videoRouter = require("./videoCard");
const {
  validateUserLogin,
  validateNewUser,
} = require("../middlewares/validation");
const { createUser, login } = require("../controllers/users");
const dataRouter = require("./data");
const { NotFoundError } = require("../middlewares/NotFoundError");
const { errorMessages } = require("../utils/errors");

router.use("/api", dataRouter);
router.use("/users", userRouter);
router.use("/mvids", videoRouter);
router.post("/signin", validateUserLogin, login);
router.post("/signup", validateNewUser, createUser);
router.use((req, res, next) => next(new NotFoundError(errorMessages.badRoute)));

module.exports = router;
