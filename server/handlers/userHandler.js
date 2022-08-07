const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// get a user based on the userId in params
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;
  try {
    await client.connect();
    const db = client.db("MadeLocally");
    const user = await db.collection("users").findOne({ _id: userId });
    return res
      .status(200)
      .json({ status: 200, data: user, message: "user found" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

//adding artisan value to particular user
const setArtisan = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userId = req.params.userId;
  try {
    await client.connect();
    const db = client.db("MadeLocally");
    const data = await db
      .collection("users")
      .updateOne({ _id: userId }, { $set: { artisan } });

    return res
      .status(200)
      .json({ status: 200, data, message: "artisan value added" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getUser, setArtisan };
