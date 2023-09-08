// import { NoteFilter } from "../cmps/NoteFilter.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { AddNote } from "../cmps/AddNote.jsx"
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

    function loadNotes() {
        noteService.query(filterBy).then(setNotes)
    }

    function onRemoveNote(noteId) {
        noteService
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
    function onChangeColor(color, noteId) {
        noteService.get(noteId).then(note => {
            const newNote = { ...note, style: { backgroundColor: color } }
            noteService.save(newNote)
            .then(() => loadNotes())
        })
    }
    function onDuplicateNote(note) {
        const newNote = { ...note, id: null }
        noteService.save(newNote)
            .then(note => {
                setNotes(prevNotes => [...prevNotes, note])
            })
    }

    function note2WayBinding(note, noteEdit) {
        const newNote = { ...note, ...noteEdit }
        noteService.save(newNote)
            .then(loadNotes)
    }

    function onAddNote(note) {
        noteService.addNote(note)
    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-mainlayout">

            <article className="subheader">
                <NoteTopFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </article>

            <article className="note-maker">
                <AddNote filterBy={filterBy} onSetFilterBy={onSetFilterBy} onAddNote={onAddNote} />
            </article>

            <aside className="note-side-filter">
                <NoteSideFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </aside>

            <main className="notes-list">
                <NoteList
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    onChangeColor={onChangeColor}
                    onDuplicateNote={onDuplicateNote}
                    note2WayBinding={note2WayBinding}
                />
            </main>
        </section>
    )
}

