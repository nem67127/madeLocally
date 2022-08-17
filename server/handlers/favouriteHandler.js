const { MongoClient, ObjectId } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const updateFavourite = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const current = req.params.userId;
  const { artisan } = req.body;
  try {
    await client.connect;
    const db = await client.db("MadeLocally");
    const currentUser = await db
      .collection("profiles")
      .findOne({ _id: current });
    const currentArt = await db
      .collection("profiles")
      .findOne({ _id: artisan });

    const isFav =
      currentUser.favArtisan &&
      currentUser.favArtisan.find((art) => art.artisanId === artisan);
    console.log(isFav);
    if (isFav) {
      //remove fav artisan from user
      const removeFav = await db
        .collection("profiles")
        .updateOne(
          { _id: current },
          { $pull: { favArtisan: { artisanId: artisan } } }
        );
      return res.status(200).json({
        status: 200,
        data: removeFav,
        message: "removed",
      });
    }

    if (!isFav) {
      //artisan does not exist in artisan fav remove them
      const addFav = await db
        .collection("profiles")
        .updateOne(
          { _id: current },
          { $push: { favArtisan: { artisanId: artisan, artisan: currentArt } } }
        );
      return res.status(200).json({
        status: 200,
        data: addFav,
        message: "favourite artist added",
      });
    }
    //if the favArtisan does not exist create it
    if (currentUser) {
      const addFavList = await db
        .collection("profiles")
        .updateOne(
          { _id: current },
          {
            $set: { favArtisan: [{ artisanId: artisan, artisan: currentArt }] },
          }
        );
      return res.status(200).json({
        status: 200,
        data: addFavList,
        message: "fav lists",
      });
    }
    //if currentuser  does not exist give error
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

module.exports = { updateFavourite };
