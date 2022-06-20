#! /usr/bin/env node

console.log('This script populates some test keyboards, mice, television and categories to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var keyboard = require('./models/keyboard')
var mouse = require('./models/mouse')
var television = require('./models/television')
var category = require('./models/category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var keyboards = []
var mice = []
var televisions = []
var categories = []

function categoryCreate(name, description, cb) {
    const category = new Category({
        name,
        description,
    });

    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Category: ' + category);
        categories.push(category);
        cb(null, category);
    });
}

function keyboardCreate(name, description, category, price, stock, file_url, cb) {
    const keyboard = new Keyboard({
        name,
        description,
        category,
        price,
        stock,
        file_url,
    });

    keyboard.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Keyboard: ' + keyboard);
        keyboards.push(keyboard);
        cb(null, keyboard);
    });
}

function mouseCreate(name, description, category, price, stock, file_url, cb) {
    const mouse = new Mouse({
        name,
        description,
        category,
        price,
        stock,
        file_url,
    });

    mouse.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Mouse: ' + mouse);
        mice.push(mouse);
        cb(null, mouse);
    });
}

function televisionCreate(name, description, category, price, stock, file_url, cb) {
    const television = new Television({
        name,
        description,
        category,
        price,
        stock,
        file_url,
    });

    television.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log('New Television: ' + television);
        televisions.push(television);
        cb(null, television);
    });
}

function createCategories(cb) {
    async.series(
        [
            function (callback) {
                categoryCreate(
                    'Computer Accessories',
                    'In this category you will find all the accessories that you might ever need for your computer with no accessories',
                    callback,
                );
            },
            function (callback) {
                categoryCreate(
                    'Electronic Devices',
                    'Here you will be shocked by the powerful TVs, Laptops and Routers that we have to offer',
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

function createKeyboards(cb) {
    async.series(
        [
            function (callback) {
                keyboardCreate(
                    'Rectangular',
                    'A perfectly rectangular keyboard that will enhance your typing because of its rectangularity',
                    categories[0],
                    39,
                    0,
                    '/images/wesley-tingey-FNhyekndnSM-unsplash.jpg',
                    callback,
                );
            },
            function (callback) {
                keyboardCreate(
                    'Circular',
                    'Some people like to be different, and you can definitely be differet with this keyboard',
                    categories[0],
                    12,
                    34,
                    '/images/nhu-nguyen-IL1qSqEMNBo-unsplash.jpg',
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

function createMice(cb) {
    async.series(
        [
            function (callback) {
                mouseCreate(
                    'Buttonful',
                    `You won't need a keyboard along this mouse thanks to its 136 buttons perfect for any situation`,
                    categories[0],
                    72,
                    42,
                    '/images/rica-naypa-7j-oAysJpo4-unsplash.jpg',
                    callback,
                );
            },
            function (callback) {
                mouseCreate(
                    'Buttonless',
                    'A mouse entirely made of a screen that is extremely responsive to your fingers',
                    categories[0],
                    340,
                    6,
                    '/images/shagal-sajid-Ox7mSmsljkc-unsplash.jpg',
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

function createTelevisions(cb) {
    async.series(
        [
            function (callback) {
                televisionCreate(
                    'Humungous',
                    'A 102 inches OLED panel that will immerse you for the rest of your life',
                    categories[1],
                    4341,
                    2,
                    '/images/diego-gonzalez--I8lDurtfAo-unsplash.jpg',
                    callback,
                );
            },
        ],
        // optional callback
        cb,
    );
}

async.series(
    [createCategories, createSmartphones, createMice, createTelevisions, createKeyboards],
    // Optional callback
    function (err, results) {
        if (err) {
            console.log('FINAL ERR: ' + err);
        }
        // All done, disconnect from database
        mongoose.connection.close();
    },
);