const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required().messages({
      "string.empty": "The ID field must be filled in",
      "string.length": "The ID must have 24 characters",
      "string.hex": "The ID must be a valid hexadecimal value",
    }),
  }),
});

const validateItem = celebrate({
  // the strTrackThumb is not required, as it will sometimes expectedly return "null" from the third party API
  body: Joi.object().keys({
    strTrack: Joi.string().required().min(1).max(300).messages({
      "string.min": "The minimum length of a title is 1 character",
      "string.max": "The maximum length of a title is 300 characters",
      "string.empty": "There must be a title of a track",
    }),
    strMusicVid: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "Music Video Link" field must be filled in',
      "string.uri": 'The "Music Video Link" field must be a valid url',
    }),
    strTrackThumb: Joi.string().custom(validateURL).messages({
      "string.empty":
        'The "Music Video thumbnail Link" field must be filled in',
      "string.uri":
        'The "Music Video thumbnail Link" field must be a valid url',
    }),
  }),
});

const validateNewUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'The "avatar" field must be a valid url',
    }),
    email: Joi.string().required().email().messages({
      "string.base": "You must enter a valid email address",
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.base": "You must enter a valid email address",
      "string.empty": 'The "email" field must be filled in',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports = {
  validateId,
  validateURL,
  validateNewUser,
  validateUserLogin,
  validateItem,
};
