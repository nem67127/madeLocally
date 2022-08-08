const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { getUser, setArtisan, createUser } = require("./handlers/userHandler");
const { getLocations } = require("./handlers/locationHandler");
const { updateProfile } = require("./handlers/profileHandlers");
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

  // parse requests of content-type - application/json
  .use(express.json())

  // parse requests of content-type - application/x-www-form-urlencoded
  .use(express.urlencoded({ extended: true }))

  //get a single user based on their _id
  .get("/api/user/:email", getUser)

  //add the key value pair of aritsan to a specific user
  .patch("/api/users/:userId", setArtisan)

  .get("/sign-up", (req, res) => {
    res.oidc.login({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  })

  // GET for profile to get the information based on userId params to show correct profile

  //PATCH to update the users profile will user profile form again - this will also insert a new document in locations collection
  .patch("/api/profile/:userId", updateProfile)
  //GET events to retrieve all the events - i want them filtered by dates if i can i want current and upcoming dates

  // GET event:eventID to retrieve one event

  //POST to create a new event to the events collection

  //GET to retrieve all the locations
  .get("/api/locations", getLocations)

  .listen(PORT, () => {
    console.log(`Made Locally listening on port ${PORT}`);
  });
