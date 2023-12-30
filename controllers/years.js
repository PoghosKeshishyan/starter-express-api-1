const Year = require('../models/Year');

// get all years
const all = ('/', async(req, res) => {
    try {
        const years = await Year.find();
        res.status(200).json(years);
    } catch (error) {
        res.status(400).json({
            message: 'I couldnt get the years',
            error: error.message,
        });
    }
})

// add new year
const add = ('/add/:year', async(req, res) => {
    try {
        const documentId = '658fd0aa348c7776d2f4bff0';
        const yearToAdd = parseInt(req.params.year);
        const existingDocument = await Year.findById(documentId);

        existingDocument.years.push(yearToAdd);

        const updatedDocument = await existingDocument.save();

        return res.status(200).json({
            message: 'Year added successfully',
            updatedDocument
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong, try again',
            error: error.message,
        })
    }
})

// remove year
const remove = ('/remove/:year', async(req, res) => {
    try {
        const yearToDelete = parseInt(req.params.year);
        const documentId = '658fd0aa348c7776d2f4bff0';
        const existingDocument = await Year.findById(documentId);
        const yearIndex = existingDocument.years.indexOf(yearToDelete);

        if (yearIndex === -1) {
            return res.status(400).json({
                message: 'Year not found in the array'
            });
        }

        existingDocument.years.splice(yearIndex, 1);

        const updatedDocument = await existingDocument.save();

        return res.status(200).json({
            message: 'Year deleted successfully',
            updatedDocument,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong, try again',
            error: error.message,
        })
    }
})

module.exports = { all, add, remove };