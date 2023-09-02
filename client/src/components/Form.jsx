import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Form = ({ addNote }) => {
    const [title, setTitle] = useState("")
    const [notes, setNotes] = useState("")
    const history = useNavigate();
    const handleTitle = (e) => {

        setTitle(e.target.value)
    }
    const handleNotes = (e) => {

        setNotes(e.target.value)
    }
    const handleSaveNote = () => {
        const newNote = {
            id: Date.now().toString(),
            title: title,
            content: notes,
        }
        addNote(newNote)
        history('/')
        console.log(newNote);
    }
    return (
        <div className='container mx-auto py-8'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>Add new Notes</h2>

            <form className='max-w-md mx-auto'>
                <div className='mb-4'>
                    <label className='block text-gray-700 font-medium mb-2'>Note Title:</label>
                    <input
                        className='w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500'
                        type='text'
                        value={title}
                        onChange={handleTitle} />
                </div>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 font-medium mb-2'>Note Content</label>
                    <textarea
                        className='w-full border border-gray-300 px-3 py-3 rounded focus:outline-none focus:border-blue-500'
                        rows='5'

                        value={notes}
                        onChange={handleNotes} ></textarea>
                </div>
                <button type='button' className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition' onClick={handleSaveNote}>Save Note</button>
            </form>


        </div>
    )
}

export default Form