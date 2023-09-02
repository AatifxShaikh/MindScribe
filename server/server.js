// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // For handling CORS (Cross-Origin Resource Sharing)
const { ObjectId } = require('mongodb');
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
console.log(process.env.MONGO_URI)
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Define a mongoose schema for your notes
const noteSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
});

const Note = mongoose.model('Note', noteSchema);

// Route to handle POST request to add a new note
app.post('/api/notes', async (req, res) => {
    try {
        const { id, title, content } = req.body;

        // Create a new note document
        const newNote = new Note({
            id: id,
            title,
            content,
        });

        // Save the new note to the database
        await newNote.save();

        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// Add this route for deleting a note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        console.log("received noteid", noteId);

        const result = await Note.findOneAndDelete({ id: noteId });

        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Note not found' });
        } // 204 No Content indicates a successful deletion
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).json({ error: err.message });
    }
});




// Add this route for updating a note
// Add this route for updating a note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

        // Find the note by ID and update it
        const updatedNote = await Note.findOneAndUpdate(
            { id: noteId }, // Find the note by id
            { title, content }, // Update the title and content
            { new: true } // Return the updated note
        );

        if (updatedNote) {
            res.json(updatedNote);
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (err) {
        console.error('Error updating note:', err);
        res.status(500).json({ error: err.message });
    }
});
app.get('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;

        // Find the note by ID
        const note = await Note.findOne({ id: noteId });

        if (!note) {
            res.status(404).json({ error: 'Note not found' });
            return;
        }

        res.json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




// Start the Express.js server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
