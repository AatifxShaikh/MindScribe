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
    const addNote = (newNotes) => {
        setNotes([...notes, newNotes])
    }
    const deleteNote = (noteId) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId)
        setNotes(updatedNotes)
    }
    const updateNote = (updatedNote) => {
        const updatedNotes = notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        setNotes(updatedNotes)
    }
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