const express = require("express");

const PORT = 8000;
const cors = require("cors");
const path = require("path");
const { auth } = require("express-openid-connect");
const { getUser, setArtisan } = require("./handlers/userHandler");
const { getLocations } = require("./handlers/locationHandler");

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

  //get a single user based on their userId = _id
  .get("/api/users/:userId", getUser)

  //add the key value pair of aritsan to a specific user
  .patch("/api/users/:userId", setArtisan)

  .get("/sign-up", (req, res) => {
    res.oidc.login({
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  })

  //POST for siging in sends new users to user collection and would set current user to

  //signout PATCH? DELETE? rmeoves user from current user

  // GET for profile to get the information based on userId params to show correct profile

  // PUT/PATCH for profile takes infor from profile form and creates a new profile with usersID

  //PATCH to update the users profile will user profile form again - this will also insert a new document in locations collection

  //GET events to retrieve all the events - i want them filtered by dates if i can i want current and upcoming dates

  // GET event:eventID to retrieve one event

  //POST to create a new event to the events collection

  //GET to retrieve all the locations
  .get("/api/locations", getLocations)

  .listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
