import React, { useEffect, useState } from 'react'
import Home from './components/Home'
import Form from './components/Form'
import { Link } from 'react-router-dom'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import IndivisualPage from './components/IndivisualPage'
import EditPage from './components/EditPage'
import Footer from './components/Footer'
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
    console.log(notes);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home notes={notes} deleteNote={deleteNote} />,
            errorElement: <Error />
        },
        {
            path: "/Form",
            element: <Form addNote={addNote} />
        },
        {
            path: "/note/:id",
            element: <IndivisualPage notes={notes} deleteNote={deleteNote} />

        },
        {
            path: "/note/:id/edit",
            element: <EditPage notes={notes} updateNote={updateNote} />
        },
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