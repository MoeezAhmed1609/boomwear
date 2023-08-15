const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "BoomWear Banner",
  },
  banner: {
    public_id: {
      type: String,
      required: [true, "Banner public id required!"],
    },
    url: { type: String, required: [true, "Banner url required!"] },
  },
});

module.exports = mongoose.model("Banners", bannerSchema);