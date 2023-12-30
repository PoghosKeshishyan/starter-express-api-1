const Journal = require('../models/Journal');

// get all journals
const all = ('/', async(req, res) => {
    try {
        const journals = await Journal.find();
        res.status(200).json(journals);
    } catch (error) {
        res.status(400).json({
            message: 'I couldnt get the journals',
            error: error.message,
        });
    }
})

// get journals by year
const by_year = ('/:year', async(req, res) => {
    try {
        const year = req.params.year;
        const journals = await Journal.find({ year });
        res.status(200).json(journals);
    } catch (error) {
        res.status(400).json({
            message: 'I couldnt get the journals',
            error: error.message,
        });
    }
})

// add new journals
const add = ('/add', async(req, res) => {
    try {
        const { year, title, content, url, img, disabled } = req.body;

        const new_journal = await new Journal({
            year, title, content, url, img, disabled,
        });

        await new_journal.save();

        res.status(201).json({
            message: 'The date was successfully added to the database',
            added_journal: new_journal,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong, try again',
            error: error.message,
        })
    }
})

// edit one journal
const edit = ('/edit/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const options = {
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validators on the update
        };

        const updated_journal = await Journal.findByIdAndUpdate(id, data, options);

        res.status(200).json({
            message: 'Document updated successfully',
            updated_journal,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating journal', 
            error: error.message,
        });
    }
})

// remove journal
const remove = ('/remove/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const deleted_journal = await Journal.findOneAndDelete({ _id: id });
        res.status(200).json({
            message: 'The release date has been deleted',
            deleted_journal,
        });
    } catch (error) {
        res.status(500).json({
            message: 'The release date could not be deleted',
            error: error.message,
        });
    }
})

module.exports = { all, by_year, add, edit, remove };