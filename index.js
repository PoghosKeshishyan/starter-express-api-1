const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ extended: true }));

app.use(express.static('public'));
app.use('/journals', require('./routes/journals.route'));
app.use('/years', require('./routes/years.route'));

start();

async function start() {
    try {
        await mongoose.connect(process.env.mongoURI, { useNewUrlParser: true })

        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}...`)
            console.log('DB ok');
        });
    } catch (error) {
        console.log('Server Error', error.message);
    }
}
