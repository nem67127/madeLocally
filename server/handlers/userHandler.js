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

  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //get user based on the _id which is the string inside ObjectId
    const user = await db.collection("profiles").findOne({ _id });
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

const getUserByLocation = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const location = req.params.location;

  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //get user based location
    const user = await db.collection("profiles").find({ location }).toArray();
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

//creating artisan value for user profile collection
const setArtisan = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.userId;
  const { artisan } = req.body;

  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //updating user to have artisan key value
    const result = await db
      .collection("users")
      .updateOne({ _id: ObjectId(`${_id}`) }, { $set: { artisan } });
    //adding an artisan key value pair to the specific profile user document
    const data = await db.collection("profiles").insertOne({ _id, artisan });
    return res
      .status(200)
      .json({ status: 200, data, message: "artisan value added and profile" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

//updating user interested events array to add/remove event
const updateInterest = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const eventId = req.params.eventId;
  const userId = req.params.userId;
  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //find the user
    const user = await db.collection("profiles").findOne({ _id: userId });
    //figure out if she has interestEvents and if the event is there
    const alreadyInterested =
      user.interestEvents &&
      user.interestEvents.find((evId) => evId.eventId === eventId);

    if (alreadyInterested) {
      //remove event from user
      const removeEvent = await db
        .collection("profiles")
        .updateOne({ _id: userId }, { $pull: { interestEvents: { eventId } } });
      return res
        .status(200)
        .json({ status: 200, data: removeEvent, message: "remove" });
    }
    if (!alreadyInterested) {
      //add event to the user
      const addEvent = await db
        .collection("profiles")
        .updateOne({ _id: userId }, { $push: { interestEvents: { eventId } } });
      return res
        .status(200)
        .json({ status: 200, data: addEvent, message: "added event" });
    }
    //if the user exists but theres no interestEvent array
    if (user) {
      const addEvent = await db
        .collection("profiles")
        .updateOne({ _id: userId }, { $set: { interestEvents: { eventId } } });
      return res
        .status(200)
        .json({ status: 200, data: addEvent, message: "added interestEvents" });
    }
    //if the user does not exist
    return res
      .status(404)
      .json({ status: 404, data: currentEvent, message: "user not found" });
  } catch (err) {
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close;
  }
};

module.exports = {
  getUser,
  setArtisan,
  getUserById,
  updateInterest,
  getUserByLocation,
};
