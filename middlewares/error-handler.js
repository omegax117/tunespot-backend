const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.error(err);
  res.status(statusCode).send({ message });
};

module.exports = {
  errorHandler,
};
