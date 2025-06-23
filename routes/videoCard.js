const router = require("express").Router();
const { validateId, validateItem } = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
} = require("../controllers/videoCard");
const auth = require("../middlewares/auth");

router.post("/", auth, validateItem, createItem);
router.get("/", auth, getItems);
router.delete("/:itemId", auth, validateId, deleteItem);

module.exports = router;
