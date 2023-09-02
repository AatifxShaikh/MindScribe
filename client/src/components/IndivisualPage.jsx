import React from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import ClipboardJS from "clipboard";
import { ClipboardCopyIcon, ShareIcon } from "@heroicons/react/solid";
const IndivisualPage = ({ notes, deleteNote, handleCopyToClipBoard }) => {
    const { id } = useParams()
    console.log();
    const note = notes.find((note) => note.id === id)
    console.log(note)
    if (!notes) {
        return <div>Loading...</div>;
    }
    const navigate = useNavigate()

    const handleCick = () => {
        deleteNote(note.id)
        navigate('/')
    }
    const generateShareableLink = (noteId) => {
        navigate(`/share/${noteId}`);
    };

    return (
        <div className="container mx-auto py-8">
            <div className="border rounded p-4 shadow-md">
                <div className='flex justify-between'>
                    <h3 className='text-lg font-semibold mb-2'>{note.title}</h3>

                    <ShareIcon
                        onClick={() => {
                            generateShareableLink(note.id); // Redirect to the note
                        }}
                        className='h-6 w-6 text-blue-500 cursor-pointer '
                    />
                </div>
                <p className="text-gray-600">{note.content}</p>
                <div className="mt-4 flex">
                    <button
                        className="text-red-500 hover:underline"
                        onClick={handleCick}
                    >
                        Delete
                    </button>
                    <Link to={`/note/${note.id}/edit`} className='text-blue-500 hover:underline px-4'>
                        Edit
                    </Link>

                    <ClipboardCopyIcon className="h-6 w-6 text-blue-500 cursor-pointer" onClick={handleCopyToClipBoard} />

                </div>
            </div>
        </div>
    );
};

export default IndivisualPage;