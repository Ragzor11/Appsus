const { Fragment } = React
import { Note } from "../cmps/Note.jsx"
// const { useState } = React
export function NoteList({ notes, onRemoveNote, onChangeColor, onDuplicateNote, onTogglePin, note2WayBinding }) {

    return (
        <Fragment>
                <div className="list-type">Pinned</div>
            <ul className="note-list pin-on">
                {notes.filter((note) => note.isPinned).map(note =>
                    <li key={note.id}>
                        <Note
                            note={note}
                            onRemoveNote={onRemoveNote}
                            onChangeColor={onChangeColor}
                            onDuplicateNote={onDuplicateNote}
                            onTogglePin={onTogglePin}
                            note2WayBinding={note2WayBinding}
                        />
                    </li>)}
            </ul>
                <div className="list-type">Others</div>
            <ul className="note-list pin-off">
                {notes.filter((note) => (!note.isPinned)).map(note =>
                    <li key={note.id}>
                        <Note
                            note={note}
                            onRemoveNote={onRemoveNote}
                            onChangeColor={onChangeColor}
                            onDuplicateNote={onDuplicateNote}
                            onTogglePin={onTogglePin}
                            note2WayBinding={note2WayBinding}
                        />
                    </li>)}
            </ul>
        </Fragment>

    )
}
