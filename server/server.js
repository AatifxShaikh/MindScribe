

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const { ObjectId } = require('mongodb');
const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cors()); 
console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


const noteSchema = new mongoose.Schema({
    id: String,
    title: String,
    content: String,
});

const Note = mongoose.model('Note', noteSchema);


app.post('/api/notes', async (req, res) => {
    try {
        const { id, title, content } = req.body;

       
        const newNote = new Note({
            id: id,
            title,
            content,
        });

        await newNote.save();

        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        console.log("received noteid", noteId);

        const result = await Note.findOneAndDelete({ id: noteId });

        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Note not found' });
        } 
    } catch (err) {
        console.error('Error deleting note:', err);
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const { title, content } = req.body;

       
        const updatedNote = await Note.findOneAndUpdate(
            { id: noteId }, 
            { title, content }, 
            { new: true }
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

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
