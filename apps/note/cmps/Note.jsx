import { NoteToolbar } from "./NoteToolbar.jsx"
const { useState, useEffect, useRef } = React

export function Note({ note, onRemoveNote, onChangeColor, onDuplicateNote, onTogglePin, note2WayBinding }) {
    const [noteEdit, setNoteEdit] = useState(note)
    const [noteColor, setNoteColor] = useState(note.style.backgroundColor)
    const [pinState, setPinState] = useState(note.isPinned)
    const [isCentered, setIsCentered] = useState(false)
    const { id, info, type, style } = noteEdit
    const { txt, title, imgUrl, vidUrl, todos } = info
    const bgStyle = { backgroundColor: noteColor, }
    const elTitle = useRef(title)
    const elTxt = useRef(txt)

    

    useEffect(() => {
        note2WayBinding(noteEdit)
    }, [noteEdit])

    function toggleCenter() {
        if (!isCentered) {
            setIsCentered((prevState) => !prevState)
        }
    }

    function handleClickOutside(event) {
        if (!event.target.closest(".note")) {
            setIsCentered(false)
        }
    }
  
    useEffect(() => {
        if (isCentered) document.addEventListener("click", handleClickOutside)
        else document.removeEventListener("click", handleClickOutside)
        
        return () => document.removeEventListener("click", handleClickOutside)

    }, [isCentered])

    // function onNoteChange() {
    //     const newTxt = elTxt.current.innerText || ''
    //     const newTitle = elTitle.current.innerText || ''

    //     if (!newTxt) elTxt.className = 'empty-txt'
    //     else elTxt.className = ''
    //     if (!newTitle) elTitle.className = 'empty-title'
    //     else elTitle.className = ''

    //     setNoteEdit((prevEdit) => ({
    //         ...prevEdit,
    //         info: {
    //             txt: newTxt,
    //             title: newTitle,
    //         },
    //     }))
    // }
    function onColorEdit(color) {
        setNoteColor(color)
        onChangeColor(color, id)
    }
    function onTogglePinChange(ev) {
        ev.stopPropagation()
        onTogglePin(note)
        setPinState(prevPinState => !prevPinState)
    }
    const isPinned = pinState ? 'pinned' : ''
    const centered = isCentered ? 'center' : ''

    function isTitleEmpty() {
        if(!elTitle.current) return false
        const isEmptyTitle = elTitle.current.textContent
        console.log('isEmptyTitle: ',isEmptyTitle);
        return isEmptyTitle
      }

    return (
        <div
            className={`note ${centered}`}
            tabIndex="0"
            onClick={toggleCenter}
            style={bgStyle}
        >
            <span className={`pin material-symbols-outlined ${isPinned}`} title="Pin Note" onClick={onTogglePinChange}>push_pin</span>
            <h1 ref={elTitle} className={`title ${isTitleEmpty() ? '' : 'empty'}`} contentEditable={true} suppressContentEditableWarning={true}>{title}</h1>
            {type === 'NoteTxt' && <p ref={elTxt} className="txt" contentEditable={true} suppressContentEditableWarning={true} >{txt} </p>}
            {type === 'NoteImg' && <img src={imgUrl}></img>}
			{type === 'NoteVid' && <iframe src={vidUrl}></iframe>}

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