import { noteService } from "../services/note.service.js"
const { useState } = React

export function AddNote({ onAddNote }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())

    // useEffect(() => {
    //     onAddNote(note)
    // }, [note])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setNewNote(prevNewNote => ({ ...prevNewNote, [field]: value }))
    }

    function onSubmitNewNote(ev) {
        ev.preventDefault()
        onAddNote(newNote)
    }

    const { title, text } = newNote

    return (
        <div className="add-note">
            <form onSubmit={onSubmitNewNote}>
                <input value={title} onChange={handleChange} type="text" placeholder="Title" name="title" />
                <input value={text} onChange={handleChange} type="textbox" placeholder="Take a note..." name="text" />
                
                <button>Add</button>
            </form>

        </div>
    )
}