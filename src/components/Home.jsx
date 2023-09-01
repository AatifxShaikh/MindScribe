import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardCopyIcon, ShareIcon } from '@heroicons/react/solid';
import Footer from './Footer';

const Home = ({ notes, deleteNote, handleCopyToClipBoard }) => {
    const [searchItem, setSearchItem] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchItem) || note.content.toLowerCase().includes(searchItem)
    );

    // Get the navigate function from React Router

    const navigate = useNavigate();
    const generateShareableLink = (noteId) => {
        navigate(`/share/${noteId}`);
    };

    const handleSearh = (e) => {
        e.preventDefault();
        setSearchItem(e.target.value);
        if (e.target.value > 0) {
            setShowSearchBar(true);
        }
        setShowCards(true);
    };

    // Function to navigate to the note when the "Share" button is clicked
    const navigateToNote = (noteId) => {
        navigate(`/note/${noteId}`);
    };

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='container mx-auto py-8 flex-grow'>
                <nav className='flex justify-between mx-8'>
                    <h1 className='font-bold text-4xl hover:underline mb-4 font-sans hover:shadow-xl'>
                        MindScribe
                    </h1>
                    <Link
                        to={'/Form'}
                        className='inline-block bg-blue-500 text-white text-lg px-4 pt-3 rounded-full hover:bg-blue-600 transition'
                    >
                        Add notes
                    </Link>
                </nav>

                <div className='mb-4 flex items-center justify-center py-2'>
                    <input
                        className='border rounded px-2 py-1 mx-auto text-center focus:outline-none focus:border-blue-500 w-3/5'
                        placeholder='Search notes...'
                        value={searchItem}
                        onChange={handleSearh}
                    />
                </div>

                {showCards ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                        {filteredNotes.map((note) => (
                            <div key={note.id} className='border rounded p-4 shadow-md hover:shadow-lg transition cursor-pointer'>
                                <div className='flex justify-between'>
                                    <h3 className='text-lg font-semibold mb-2'>{note.title}</h3>

                                    <ShareIcon
                                        onClick={() => {
                                            generateShareableLink(note.id); // Redirect to the note
                                        }}
                                        className='h-6 w-6 text-blue-500 cursor-pointer '
                                    />
                                </div>



                                <p className='text-gray-600'>{note.content.slice(0, 200)}</p>

                                <div className='mt-4 flex'>
                                    <Link to={`/note/${note.id}`} className='text-blue-500 hover:underline'>
                                        View
                                    </Link>
                                    <button className='ml-2 text-red-500 hover:underline' onClick={() => deleteNote(note.id)}>
                                        Delete
                                    </button>
                                    <ClipboardCopyIcon className='h-6 w-6 text-blue-500 cursor-pointer' onClick={() => handleCopyToClipBoard(note.id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                        {notes.map((note) => (
                            <div key={note.id} className='border rounded p-4 shadow-md hover:shadow-lg transition cursor-pointer'>
                                <div className='flex justify-between'>
                                    <h3 className='text-lg font-semibold mb-2'>{note.title}</h3>

                                    <ShareIcon
                                        onClick={() => {
                                            generateShareableLink(note.id); // Redirect to the note
                                        }}
                                        className='h-6 w-6 text-blue-500 cursor-pointer '
                                    /></div>



                                <p className='text-gray-600'>{note.content.slice(0, 200)}</p>

                                <div className='mt-4 flex'>
                                    <Link to={`/note/${note.id}`} className='text-blue-500 hover:underline'>
                                        View
                                    </Link>
                                    <button className='ml-2 text-red-500 hover:underline' onClick={() => deleteNote(note.id)}>
                                        Delete
                                    </button>
                                    <ClipboardCopyIcon className='h-6 w-6 text-blue-500 cursor-pointer' onClick={() => handleCopyToClipBoard(note.id)} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
