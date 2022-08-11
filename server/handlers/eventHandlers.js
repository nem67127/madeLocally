const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getAllEvents = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    const results = await db.collection("events").find().toArray();
    if (results.length <= 0) {
      return res.status(404).json({
        status: 404,
        data: results,
        message: "No events found",
      });
    }
    console.log(results);
    return res
      .status(200)
      .json({ status: 200, data: results, message: "events populated" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

const createEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    const event = await db.collection("events").insertOne({ ...req.body });
    return res
      .status(200)
      .json({ status: 200, data: event, message: "event created" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getAllEvents, createEvent };
