import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import Form from './components/Form'
import { Link, useNavigate } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndivisualPage from './components/IndivisualPage'
import EditPage from './components/EditPage'
import Shareable from './components/Shareable'

import './App.css'
const App = () => {
    const initialNotes = JSON.parse(localStorage.getItem('notes')) || []
    const [notes, setNotes] = useState(initialNotes)
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes])
    const addNote = async (newNotes) => {
        if (!newNotes.title || !newNotes.content) {
            alert('Please provide both a title and content for the note.');
            return;
        }
        try {
            const response = await fetch('http://localhost:3000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNotes),
            });
            if (response.status === 201) {
                const data = await response.json();
                setNotes([...notes, newNotes]) // Notify the parent component that a new note was added

            } else {
                console.error('Failed to create note');
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
        ;

    }
    const deleteNote = async (noteId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
                method: 'DELETE',
            });
            if (response.status === 204) {
                // Note was successfully deleted in the backend
                // You can remove the note from your local state here
                const updatedNotes = notes.filter((note) => note.id !== noteId);
                setNotes(updatedNotes);
            } else {
                console.error('Failed to delete note');
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
        const updatedNotes = notes.filter((note) => note.id !== noteId)
        setNotes(updatedNotes)
    }
    const updateNote = async (updatedNote) => {
        try {
            const response = await fetch(`http://localhost:3000/api/notes/${updatedNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedNote), // Pass the updated note data
            });
            if (response.status === 200) {
                // Note was successfully updated in the backend

                // Update the note in your local state
                const updatedNotes = notes.map((note) =>
                    note.id === updatedNote.id ? updatedNote : note
                );
                setNotes(updatedNotes);
            } else {
                console.error('Failed to update note');
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    const handleCopyToClipBoard = () => {
        const texttoCopy = notes[0].content.toString()
        console.log(notes[0].content);
        navigator.clipboard.writeText(texttoCopy)
            .then(() => {
                console.log("Text copied to clipBoard", texttoCopy);
            })
            .catch((err) => {
                console.error("Failed to copy text:", err)
            })
    }

    console.log(notes);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home notes={notes} deleteNote={deleteNote} handleCopyToClipBoard={handleCopyToClipBoard} />,
            // errorElement: <Error />
        },
        {
            path: "/Form",
            element: <Form addNote={addNote} />
        },
        {
            path: "/note/:id",
            element: <IndivisualPage notes={notes} deleteNote={deleteNote} handleCopyToClipBoard={handleCopyToClipBoard} />

        },
        {
            path: "/note/:id/edit",
            element: <EditPage notes={notes} updateNote={updateNote} />
        },
        {
            path: "/share/:noteId",
            element: <Shareable notes={notes} />
        },
        {
            path: "/share/*",
            element: <App />
        }
        // {
        //     path: '',
        //     element: <Footer />

        // }
    ])
    // const handleClick = () => {
    //     <Link to={'/Form'} />
    // }
    return (
        <div className='flex flex-col min-h-screen'>
            <RouterProvider router={router} />

        </div>
    )
}

export default App