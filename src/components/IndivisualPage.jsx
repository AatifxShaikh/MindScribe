import React from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from 'react-router-dom'
const IndivisualPage = ({ notes, deleteNote }) => {
    const { id } = useParams()
    const note = notes.find((note) => note.id === parseInt(id))
    if (!notes) {
        return <div>Loading...</div>;
    }
    const Navigate = useNavigate()
    const handleCick = () => {
        deleteNote(note.id)
        Navigate('/')
    }
    return (
        <div className="container mx-auto py-8">
            <div className="border rounded p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-600">{note.content}</p>
                <div className="mt-4">
                    <button
                        className="text-red-500 hover:underline"
                        onClick={handleCick}
                    >
                        Delete
                    </button>
                    <Link to={`/note/${note.id}/edit`} className='text-blue-500 hover:underline px-4'>
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IndivisualPage;
