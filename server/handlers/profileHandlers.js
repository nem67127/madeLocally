const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.userId;
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    const data = await db
      .collection("users")
      .updateOne({ _id: ObjectId(`${_id}`) }, { $set: { ...req.body } });
    return res
      .status(200)
      .json({ status: 200, data, message: "updated values" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

//get a profile based on _id
module.exports = { updateProfile };
