const mongoose = require('mongoose');

// mouseSchema is a new Schema object that defines the structure of the documents in the collection.
const mouseSchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        minlength: 1,
        required: true,
        ref: 'Category',
    },
    price: { type: Number, min: 1, required: true },
    stock: { type: Number, required: true },
    file_url: String,
});

// virtual is a method that allows you to create a virtual property that is not stored in the database.
mouseSchema.virtual('url').get(function () {
    return `/catalog/computer-accessories/item/${this._id}`;
});

// module.exports is a special object that is used to export functions and variables from a module.
module.exports = mongoose.model('Mouse', mouseSchema);