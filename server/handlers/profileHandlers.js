const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateProfile = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const _id = req.params.profileId;
  const { profilePic, images, categories } = req.body;

  try {
    await client.connect();
    const db = await client.db("MadeLocally");
    //if there is no new profile pic or categories or showcase images
    if (profilePic === null && categories.length <= 0 && images.length <= 0) {
      const { profilePic, categories, images, ...rest } = req.body;
      const data = await db
        .collection("profiles")
        .updateOne({ _id }, { $set: { ...rest } });
      return res.status(200).json({
        status: 200,
        data,
        message: "updated values, not the profile pic, categories, or showcase",
      });
    }
    //if there are no profilePic or categories
    if (profilePic === null && categories.length <= 0) {
      const { profilePic, categories, ...rest } = req.body;
      const data = await db
        .collection("profiles")
        .updateOne({ _id }, { $set: { ...rest } });
      return res.status(200).json({
        status: 200,
        data,
        message: "updated values, not the profile pic or categories",
      });
    }
    //if theres no profile pic or showcase images
    if (profilePic === null && images.length <= 0) {
      const { profilePic, images, ...rest } = req.body;
      const data = await db
        .collection("profiles")
        .updateOne({ _id }, { $set: { ...rest } });
      return res.status(200).json({
        status: 200,
        data,
        message: "updated values, not the profile pic or showcase",
      });
    }
    //if theres no showcase images or categories
    if (images.length <= 0 && categories.length <= 0) {
      const { images, categories, ...rest } = req.body;
      const data = await db
        .collection("profiles")
        .updateOne({ _id }, { $set: { ...rest } });
      return res.status(200).json({
        status: 200,
        data,
        message: "updated values, not the showcase or categories",
      });
    }
    //if there is no profilePic
    if (profilePic === null) {
      const { profilePic, ...rest } = req.body;
      const data = await db
        .collection("profiles")
        .updateOne({ _id }, { $set: { ...rest } });
      return res.status(200).json({
        status: 200,
        data,
        message: "updated values, not the profile pic",
      });
    }
    //if there are now showcase images to update
    if (images.length <= 0 || !images) {
      const { images, ...rest } = req.body;
      const data = await db
        .collection("profiles")
        .updateOne({ _id }, { $set: { ...rest } });
      return res.status(200).json({
        status: 200,
        data,
        message: "updated values, not the showcase images",
      });
    }
    //if there are now categories to update
    if (categories.length <= 0 || !categories) {
      const { categories, ...rest } = req.body;
      const data = await db
        .collection("profiles")
        .updateOne({ _id }, { $set: { ...rest } });
      return res.status(200).json({
        status: 200,
        data,
        message: "updated values, not the categories",
      });
    }
    //if there is profile pic and showcase images
    const data = await db
      .collection("profiles")
      .updateOne({ _id }, { $set: { ...req.body } });
    return res
      .status(200)
      .json({ status: 200, data, message: "updated values" });
  } catch (err) {
    console.log(err.stack);
    return res
      .status(500)
      .json({ status: 500, data: req.body, message: err.message });
  } finally {
    client.close();
  }
};

//get a profile based on _id
module.exports = { updateProfile };
