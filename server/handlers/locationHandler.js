const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getLocations = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    const locations = await db.collection("locations").find().toArray();
    locations.length <= 0
      ? res
          .status(404)
          .json({ status: 404, data: locations, message: "No locations found" })
      : res.status(200).json({
          status: 200,
          data: locations,
          message: "Locations retrieved",
        });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

//get users information based on location clicked
const createNewLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const { location, lat, lng } = req.body;
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //find if user already exist in locations
    const { user } = req.body;
    const foundUser = await db.collection("locations").findOne({ user });
    if (foundUser) {
      //update location
      const updateLocation = await db
        .collection("locations")
        .updateOne({ user }, { $set: { ...req.body } });
      return res.status(200).json({
        status: 200,
        data: updateLocation,
        message: "updated location",
      });
    }
    const locations = await db
      .collection("locations")
      .insertOne({ ...req.body });
    return res
      .status(200)
      .json({ status: 200, data: locations, message: "location added" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

module.exports = { getLocations, createNewLocation };
