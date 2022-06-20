const mongoose = require('mongoose');

// the mouseSchema is a new Schema object that defines the structure of the documents in the collection.
const categorySchema = new mongoose.Schema({
    name: { type: String, minlength: 1, required: true },
    description: String,
    file_url: String,
});

// virtual is a method that allows you to create a virtual property that is not stored in the database.
categorySchema.virtual('url').get(function () {
    const url = this.name
        .split(' ')
        .map((word) => word.toLowerCase())
        .join('-');
    return url;
});

// module.exports is a special object that is used to export functions and variables from a module.
module.exports = mongoose.model('Category', categorySchema);