const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const {
  getUser,
  setArtisan,
  getUserById,
  updateInterest,
  getUserByLocation,
} = require("./handlers/userHandler");
const {
  getLocations,
  createNewLocation,
} = require("./handlers/locationHandler");
const { updateProfile } = require("./handlers/profileHandlers");
const {
  createEvent,
  getAllEvents,
  updateVendorList,
  getEvent,
} = require("./handlers/eventHandlers");
const PORT = 8000;

dotenv.config();

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  // enable CORS
  .use(cors())
  .use(morgan("tiny"))
  .use(bodyParser.json({ limit: "50mb" }))
  .use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
  // parse requests of content-type - application/json
  .use(express.json())

  // parse requests of content-type - application/x-www-form-urlencoded
  .use(express.urlencoded({ extended: true }))

  //get a single user based on their email
  .get("/api/user/:email", getUser)
  //get a user profile based on thier id
  .get("/api/users/:userId", getUserById)
  //get user(s) by location
  .get("/api/user-location/:location", getUserByLocation)

  //update user interested event array
  .patch("/api/user-interest/:eventId/:userId", updateInterest)

  //add the key value pair of aritsan and create user profile in profiles collection
  .post("/api/users/:userId", setArtisan)

  .get("/sign-up", (req, res) => {
    res.oidc.login({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  })

  //PATCH to update the users profile will user profile form again - this will also insert a new document in locations collection
  .patch("/api/profile/:profileId", updateProfile)

  //GET events to retrieve all the events - i want them filtered by dates if i can i want current and upcoming dates
  .get("/api/events", getAllEvents)
  // GET event:eventID to retrieve one event
  .get("/api/event/:eventId", getEvent)
  //POST to create a new event to the events collection
  .post("/api/events", createEvent)
  // update event vendors and where user is vending
  .patch("/api/vendor-update/:eventId/:userId", updateVendorList)
  //GET to retrieve all the locations
  .get("/api/locations", getLocations)
  //Add a new location
  .post("/api/locations", createNewLocation)

  .listen(PORT, () => {
    console.log(`Made Locally listening on port ${PORT}`);
  });
