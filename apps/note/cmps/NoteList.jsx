import { Note } from "../cmps/Note.jsx"

export function NoteList({ notes, onRemoveNote, onChangeColor,  onDuplicateNote}) {

    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <Note
                        note={note}
                        onRemoveNote={onRemoveNote}
                        onChangeColor={onChangeColor}
                        onDuplicateNote={onDuplicateNote}
                    />
                </li>)}
        </ul>
    )
}
