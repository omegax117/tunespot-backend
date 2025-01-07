const { JWT_SECRET = "32-character-ultra-secure-secret" } = process.env;

const MONGOOSE = "mongodb://127.0.0.1:27017/tunespotDB";

const API_KEY = "2";

module.exports = {
  JWT_SECRET,
  MONGOOSE,
  API_KEY,
};
