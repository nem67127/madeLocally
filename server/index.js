const express = require("express");

const PORT = 8000;

express()
  .get("/", (req, res) => {
    res.status(200).json({ status: 200, message: "Hello World!" });
  })
  // GET for retireving map data to show case

  //POST for siging in sends new users to user collection and would set current user to

  //signout PATCH? DELETE? rmeoves user from current user

  // GET for profile to get the information based on userId params to show correct profile

  // POST for profile takes infor from profile form and creates a new profile with usersID

  //PATCH to update the users profile will user profile form again

  //GET events to retrieve all the events - i want them filtered by dates if i can i want current and upcoming dates

  // GET event:evenID to retrieve one event

  //POST to create a new event to the events collection

  .listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
