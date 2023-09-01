import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { useState } from 'react'
const EditPage = ({ notes, updateNote }) => {
    const { id } = useParams()
    const note = notes.find((note) => note.id === parseInt(id))
    const navigate = useNavigate()
    const [updatedTitle, setUpdatedTitle] = useState(note.title)
    const [updatedContent, setUpdatedContent] = useState(note.content)

    const handleUpdateNote = () => {
        const updatedNote = {
            ...note,
            title: updatedTitle,
            content: updatedContent,
        }
        updateNote(updatedNote)
        localStorage.setItem('notes', JSON.stringify(notes))
        navigate("/")
    }
    return (
        <div className='container mx-auto py-8'>
            <h2 className='text-2xl text-center font-semibold mb-4'>Edit Note</h2>
            <form className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 "
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
                        rows="5"
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                    ></textarea>
                </div>
                <button
                    type="button"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    onClick={handleUpdateNote}
                >
                    Update Note
                </button>
            </form>
        </div>
    )
}

export default EditPage