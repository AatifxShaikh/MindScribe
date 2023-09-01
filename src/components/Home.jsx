import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cards from './Cards'
import { SearchIcon } from '@heroicons/react/solid'
import Footer from './Footer'

const Home = ({ notes, deleteNote }) => {
    const [searchItem, setSearchItem] = useState('');
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [showCards, setShowCards] = useState(false)
    const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchItem) || note.content.toLowerCase().includes(searchItem))

    const handleSearh = (e) => {
        e.preventDefault()
        console.log("a");
        setSearchItem(e.target.value)
        if (e.target.value > 0) {
            setShowSearchBar(true)
        }
        setShowCards(true)
    }
    return (
        <div className='flex flex-col min-h-screen'>
            <div className='container mx-auto py-8  flex-grow'>
                <nav className='flex justify-between mx-8'>
                    <h1 className='font-bold text-4xl hover:underline mb-4 font-sans hover:shadow-xl'>MindScribe</h1>
                    <Link to={'/Form'} className='inline-block bg-blue-500 text-white text-lg px-4 pt-3 rounded-full hover:bg-blue-600 transition'>Add notes</Link>
                </nav>
                {/* {filteredNotes.length > 5 && showSearchBar && ( */}

                <div className='mb-4 flex items-center justify-center py-2'>
                    <input

                        className='border rounded px-2 py-1 mx-auto text-center focus:outline-none focus:border-blue-500 w-3/5'
                        placeholder='Search notes...'
                        value={searchItem}
                        onChange={handleSearh}
                    />
                    {/* <button className='bg-blue-500 text-white rounded-r px-4 py-2'>
                    <SearchIcon className='h-5 w-5' />
                </button> */}
                </div>

                {
                    showCards ? <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'> {filteredNotes.map((note) => (
                        <div key={note.id}
                            className='border rounded p-4 shadow-md hover:shadow-lg transition cursor-pointer'>
                            <h3 className='text-lg font-semibold mb-2'>{note.title}</h3>
                            <p className='text-gray-600'>{note.content.slice(0, 200)}</p>
                            <div className='mt-4'>
                                <Link to={`/note/${note.id}`} className='text-blue-500 hover:underline'>View</Link>
                                <button
                                    className='ml-2 text-red-500 hover:underline'
                                    onClick={() => deleteNote(note.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>

                        :


                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4'>
                            {notes.map((note) => (
                                <div key={note.id}
                                    className='border rounded p-4 shadow-md hover:shadow-lg transition cursor-pointer'>
                                    <h3 className='text-lg font-semibold mb-2'>{note.title}</h3>
                                    <p className='text-gray-600'>{note.content.slice(0, 200)}</p>
                                    <div className='mt-4'>
                                        <Link to={`/note/${note.id}`} className='text-blue-500 hover:underline'>View</Link>
                                        <button
                                            className='ml-2 text-red-500 hover:underline'
                                            onClick={() => deleteNote(note.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>}

            </div>
            <Footer />
        </div>
    )
}

export default Home