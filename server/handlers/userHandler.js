const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// get a user based on the email in params
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.email;
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //get user based on the email
    const user = await db.collection("users").findOne({ email });
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
const getUserById = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.userId;
  console.log(_id);
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //get user based on the _id which is the string inside ObjectId
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(`${_id}`) });
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
  const _id = req.params.userId;
  const { artisan } = req.body;

  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //adding an artisan key value pair to the specific user document
    const data = await db
      .collection("users")
      .updateOne({ _id: ObjectId(`${_id}`) }, { $set: { artisan } });
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

module.exports = { getUser, setArtisan, getUserById };
