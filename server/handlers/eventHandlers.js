const { MongoClient, ObjectId } = require("mongodb");

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

//get event based on the _id == eventId
const getEvent = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.eventId;
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    const result = await db
      .collection("events")
      .findOne({ _id: ObjectId(`${_id}`) });
    if (!result) {
      return res.status(404).json({
        status: 404,
        data: results,
        message: "No events found",
      });
    }

    return res
      .status(200)
      .json({ status: 200, data: result, message: "event populated" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

// update event vendors and add/remove event from the artisan

const updateVendorList = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const eventId = req.params.eventId;
  const userId = req.params.userId;
  try {
    await client.connect;
    const db = await client.db("MadeLocally");
    const currentEvent = await db
      .collection("events")
      .findOne({ _id: ObjectId(`${eventId}`) });
    //search if user is already vending
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(`${userId}`) });
    console.log(user);
    const isVending =
      currentEvent.vendor &&
      currentEvent.vendor.find((obj) => obj.userId === userId);
    if (isVending) {
      //remove from vendors
      const removeVendor = await db
        .collection("events")
        .updateOne(
          { _id: ObjectId(`${eventId}`) },
          { $pull: { vendor: { userId } } }
        );
      //remove event from vending
      const removeEvent = await db
        .collection("users")
        .updateOne(
          { _id: ObjectId(`${userId}`) },
          { $pull: { vending: { eventId } } }
        );
      return res.status(200).json({
        status: 200,
        data: { removeVendor, removeEvent },
        message: "removed",
      });
    }
    if (!isVending) {
      //if the user is not a vendor add to vendor list and add event to user's vending
      const addVendor = await db
        .collection("events")
        .updateOne(
          { _id: ObjectId(`${eventId}`) },
          { $push: { vendor: { userId } } }
        );
      const addEvent = await db
        .collection("users")
        .updateOne(
          { _id: ObjectId(`${userId}`) },
          { $push: { vending: { eventId } } }
        );
      return res.status(200).json({
        status: 200,
        data: { addVendor, addEvent },
        message: "vendor added and event added",
      });
    }
    //if the currentEvent exists but the vendor array does not
    if (currentEvent) {
      const addVendorList = await db
        .collection("events")
        .updateOne(
          { _id: ObjectId(`${eventId}`) },
          { $set: { vendor: [{ userId }] } }
        );
      const addVendingList = await db
        .collection("users")
        .updateOne(
          { _id: ObjectId(`${userId}`) },
          { $set: { vending: [{ eventId }] } }
        );
      return res.status(200).json({
        status: 200,
        data: { addVendorList, addVendingList },
        message: "vendor/vending lists",
      });
    }
    //if event does not exist give error
    return res
      .status(404)
      .json({ status: 404, data: currentEvent, message: "event not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close;
  }
};

module.exports = { getAllEvents, createEvent, updateVendorList, getEvent };
