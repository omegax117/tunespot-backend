require("dotenv").config();
const router = require("express").Router();
const axios = require("axios");

router.get("/data", async (req, res) => {
  const query = req.query.name;
  console.log(req.query.name);
  console.log(process.env.API_KEY);
  try {
    const response = await axios.get(
      `https://www.theaudiodb.com/api/v1/json/${process.env.API_KEY}/searchalbum.php?s=${query}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

module.exports = router;
