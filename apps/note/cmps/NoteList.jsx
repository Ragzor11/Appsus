import {Note} from "../cmps/Note.jsx"
export function NoteList({ notes }) {
    console.log('hi');

    return (
        <ul className="book-list">
            {notes.map(note =>
                <li key={note.id}>
                    <Note note={note} />

                </li>)}
        </ul>
    )
}
