const { Fragment } = React
import { Note } from "../cmps/Note.jsx"

export function NoteList({ notes, onRemoveNote, onChangeColor, onDuplicateNote, onTogglePin, note2WayBinding }) {

    return (
        <Fragment>
            <ul className="note-list pin-on">
                <div className="list-type">Pinned</div>
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
            <ul className="note-list pin-off">
                <div className="list-type">Others</div>
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
