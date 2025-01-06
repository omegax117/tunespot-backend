const { NotFoundError } = require("./NotFoundError");
const { errorMessages } = require("../utils/errors");

const handleError = (req, res, next) =>
  next(new NotFoundError(errorMessages.badRoute));

export default handleError;
