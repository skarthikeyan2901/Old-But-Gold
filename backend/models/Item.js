const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  name: String,
  itemType: String,
  daysUsed: String,
  images: String,
  datePosted: Date,
  issued: Boolean,
  issueTo: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null
  },
});

const Item = mongoose.model('Item',ItemSchema);

module.exports = Item;