const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new mongoose.Schema({
    userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "user",
		
	},
    name:String,
    typee: String,
    daysUsed:String,
    images: Array,
})

const Item = mongoose.model('Item',ItemSchema);

module.exports = Item;