// ShareableNote.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShareableNote = ({ notes }) => {
    const { noteId } = useParams();
    const [note, setNote] = useState(null); // State to hold the shared note
    const [loading, setLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        // Find the shared note in your notes data based on the noteId.
        const sharedNote = notes.find((n) => n.id.toString() === noteId.toString()
        );
        console.log(sharedNote)
        console.log(noteId);
        console.log(notes);
        if (sharedNote) {
            setNote(sharedNote);
            setLoading(false);
        } else {
            setError('Note not found');
            setLoading(false);
        }
    }, [noteId, notes]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!note) {
        return <div>Note not found</div>;
    }

    return (
        <div className="container mx-auto py-8 lg:w-1/2 xl:w-1/3 p-4">
            <div className="border rounded p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
            </div>
        </div>
    );
};

export default ShareableNote;
