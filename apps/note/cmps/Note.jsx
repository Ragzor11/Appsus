import { NoteToolbar } from "./NoteToolbar.jsx"
const { useState, useEffect, useRef } = React

export function Note({ note, onRemoveNote, onChangeColor, onDuplicateNote, onTogglePin, note2WayBinding }) {
    const [noteEdit, setNoteEdit] = useState(note)
    const [noteColor, setNoteColor] = useState(note.style.backgroundColor)
    //console.log(noteEdit);
    const { id, info, type, style } = noteEdit
    const  { txt, title, url, todos } = info
    useEffect( ()=> {
        note2WayBinding(noteEdit)
    }, [noteEdit])
    const bgStyle = { backgroundColor: noteColor, }
    const elTitle = useRef(title)
    const elTxt = useRef(txt)

    function onNoteChange() {
                const newTxt = elTxt.current.innerText || ''
                const newTitle = elTitle.current.innerText || ''

                if (!newTxt) elTxt.className = 'empty-txt'
                else elTxt.className = ''
                if (!newTitle) elTitle.className = 'empty-title'
                else elTitle.className = ''
        
                setNoteEdit((prevEdit) => ({
                    ...prevEdit,
                    info: {
                        txt: newTxt,
                        title: newTitle,
                    },
                }))
    }
    function onColorEdit(color){
        setNoteColor(color)
        onChangeColor(color, id)
    }

    return (
        <div className="note" style={bgStyle} onBlur={onNoteChange} >

            {type === 'NoteImg' && <img src={url} alt="image!" />}
            {!title && <h1 ref={elTitle} className="empty-title" contentEditable={true} suppressContentEditableWarning={true}></h1>}
            {title && <h1 ref={elTitle} contentEditable={true} suppressContentEditableWarning={true} >{title} </h1>}
            {txt && <p  ref={elTxt} contentEditable={true} suppressContentEditableWarning={true} >{txt} </p>}
            <NoteToolbar
                note={noteEdit}
                onRemoveNote={onRemoveNote}
                onColorEdit={onColorEdit}
                onDuplicateNote={onDuplicateNote}
                onTogglePin={onTogglePin}
            />
        </div>
    )
}