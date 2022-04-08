const mongoose = require('mongoose');
const schema = mongoose.schema;

const ItemSchema = new mongoose.Schema({
    name: String,
    owner: String,
    type: String,
    images: Array,
})

const Item = mongoose.model('Item',ItemSchema);

module.exports = Item;