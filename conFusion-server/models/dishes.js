const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const Schema = mongoose.Schema;

const dishSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

dishSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "dish",
});

// Make sure virtual fields are included in JSON output
dishSchema.set("toJSON", { virtuals: true });
dishSchema.set("toObject", { virtuals: true });

var Dishes = mongoose.model("Dish", dishSchema);
module.exports = Dishes;
