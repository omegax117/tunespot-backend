const videoCard = require("../models/videoCard");
const { errorMessages } = require("../utils/errors");
const { BadRequestError } = require("../middlewares/BadRequestError");
const { NotFoundError } = require("../middlewares/NotFoundError");
const { ForbiddenError } = require("../middlewares/ForbiddenError");

const getItems = (req, res, next) => {
  videoCard
    .find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      next(err);
    });
};

const createItem = (req, res, next) => {
  const { strTrack, strMusicVid, strTrackThumb } = req.body;
  const owner = req.user._id;
  videoCard
    .create({ strTrack, strMusicVid, strTrackThumb, owner })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(errorMessages.Validation));
      }
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  console.log(req);
  const { itemId } = req.params;
  const userId = req.user._id;
  videoCard
    .findById(itemId)
    .orFail()
    .then((item) => {
      if (String(item.owner) !== userId) {
        return next(new ForbiddenError(errorMessages.Unauthorized));
      }
      return videoCard
        .findByIdAndDelete(itemId)
        .orFail()
        .then(() =>
          res.status(200).send({ message: "Item succesfully deleted" })
        );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(errorMessages.notFound));
      }
      if (err.name === "CastError") {
        next(new BadRequestError(errorMessages.Cast));
      }
      next(err);
    });
};

module.exports = { getItems, createItem, deleteItem };
