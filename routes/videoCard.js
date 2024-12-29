const router = require("express").Router();
const { validateId } = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/videoCard");
const auth = require("../middlewares/auth");

router.post("/", auth, createItem);
router.get("/", getItems);
router.delete("/:itemId", auth, validateId, deleteItem);

module.exports = router;
