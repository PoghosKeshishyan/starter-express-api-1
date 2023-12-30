const { Schema, model } = require('mongoose');

const schema = new Schema({
    years: {
        type: [Number]
    },
});

module.exports = model('Year', schema);
