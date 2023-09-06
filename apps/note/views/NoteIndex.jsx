// import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteTopFilter } from "../cmps/NoteTopFilter.jsx"
import { NoteSideFilter } from "../cmps/NoteSideFilter.jsx"

import { noteService } from "../services/note.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"



const { useState, useEffect } = React
//const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())


    useEffect(() => {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }, [filterBy])

    function onRemoveNote(noteId) {
        bookService
            .remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note Removed! ${noteId}`)
            })
            .catch(err => {
                console.error(err)
                showErrorMsg(`Problem Removing Note ${noteId}`)
            })
    }


    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    // function onAddBook(googleBook) {
    //     noteService.addBook(googleBook)
    //         .then((book) => {
    //             if (book) {
    //                 const msg = {
    //                     txt: `Added ${googleBook.title} to the list`,
    //                     type: `success`,
    //                     bookId: googleBook.id,
    //                 }
    //                 eventBusService.emit('user-msg', msg)
    //                 setNotes((prevBooks) => [...prevBooks, book])
    //                 return
    //             } else {
    //                 const msg = {
    //                     txt: `Added ${googleBook.title} already exists in the list`,
    //                     type: `error`,
    //                     bookId: googleBook.id,
    //                 }
    //                 eventBusService.emit('user-msg', msg)
    //             }
    //         })
    // }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-mainlayout">

            <div className="subheader">
                <NoteTopFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </div>

            <aside className="note-side-filter">
                <NoteSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </aside>

            <main className="notes-list">
                <NoteList notes={notes} onRemoveNote={onRemoveNote} />
            </main>
        </section>
    )
}



