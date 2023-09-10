import { showErrorMsg , showSuccessMsg} from '../../../services/event-bus.service.js'
import { noteService } from "../services/note.service.js"
import { NoteTxt } from "./NoteTxt.jsx"
import { NoteImg } from "./NoteImg.jsx"
import { NoteVid } from "./NoteVid.jsx"
const { useState, useEffect } = React


export function AddNote({ onAddNote }) {
    const [newNote, setNewNote] = useState(noteService.getEmptyNote())
    const [addOpen, setAddOpen] = useState(false)
    const [isColorChoicesVisible, setColorChoicesVisible] = useState(false)
    const [pinState, setPinState] = useState(newNote.isPinned)
    const [newColor, setNewColor] = useState('white')
    const { info, type } = newNote
    const { txt, title, imgUrl, vidUrl } = info
    
    const colorScheme = ['Default', 'Coral', 'Peach', 'Sand', 'Mint', 'Sage', 'Fog', 'Storm', 'Dusk', 'Blossom', 'Clay', 'Chalk']
    const colorCode = ['white', '#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd', '#e9e3d4', '#efeff1']
    function toggleAddOpen() {
        if (!addOpen) {
            setAddOpen((prevState) => !prevState)
        }
    }

    function handleClickOutside(event) {
        if (!event.target.closest(".add-note")) {
            setAddOpen(false)
            setColorChoicesVisible(false)
        }
    }

    useEffect(() => {
        if (addOpen) document.addEventListener("click", handleClickOutside)
        else document.removeEventListener("click", handleClickOutside)
        return () => document.removeEventListener("click", handleClickOutside)
    }, [addOpen])
    
    // function applyImageUrl() {
    //     if (imageUrl) {
    //         setNewNote((prevNote) => ({
    //             ...prevNote,
    //             info: {
    //                 ...prevNote.info,
    //                 url: imageUrl,
    //             },
    //         }))
    //     }
    // }
    
    function toggleColorChoices() {
        setColorChoicesVisible(!isColorChoicesVisible)
    }
    
    // function onTxtChange({ target }) {
    //     setNewNote((prevEdit) => ({
    //         ...prevEdit,
    //         info: {
    //             txt: target.value,
    //         },
    //     }))
    // }
    // function onTitleChange({ target }) {
        //     console.log('i;m in title change', target.value)
        //     const { value } = event.target
        //     setNewNote((prevEdit) => ({
            //         ...prevEdit,
            //         info: {
                //             title: value,
                //         },
                //     }));
                // }
                
    function onSubmitNewNote(ev) {
        ev.preventDefault()
        if (!txt && !title) {
            showErrorMsg('Text input required')
            return
        }
        onAddNote(newNote)
        setNewNote(noteService.getEmptyNote())
        setAddOpen(false)
    }
    
    function onColorEdit(color) {
        setNewColor(color)
        setNewNote((prevEdit) => ({
            ...prevEdit,
            style: { backgroundColor: color }
        }))
    }
    
    function onTogglePinChange(event) {
        event.stopPropagation()
        setPinState(prevPinState => !prevPinState)
        setNewNote((prevNote => (
            { ...prevNote, isPinned: pinState }
            )))
        }
        
        function onChangeNoteType(type) {
            setNewNote((prevEdit) => ({
                ...prevEdit,
                type,
            }))
        }
        function handleChange({ target }) {
            const field = target.name
            const value = target.value
            console.log('field: ' ,field);
            console.log('value: ' , value)
            if (field === 'title') setNewNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, title: value } }))
            else if (field === 'txt') setNewNote(prevNote => ({ ...prevNote, info: { title: prevNote.info.title, [field]: value } }))
        else setNewNote(prevNote => ({ ...prevNote, info: { title: prevNote.info.title, [field]: value } }))
}


    const bgStyle = { backgroundColor: newColor, }
    
    
    const isPinned = pinState ? 'pinned' : ''
    
    return (
        <div className="note add-note" style={bgStyle} onClick={toggleAddOpen} >
            <span className={`pin material-symbols-outlined ${isPinned}`} title="Pin Note" onClick={onTogglePinChange}>push_pin</span>
            <form onSubmit={onSubmitNewNote}>
                {addOpen && (<input value={title} onChange={handleChange} type="text" placeholder="Title" name="title" />)}
				<DynamicNoteSelector
					type={type}
					handleChange={handleChange}
					txt={txt}
					imgUrl={imgUrl}
					videoUrl={vidUrl}
					newNote={newNote}
					setNewNote={setNewNote}
				/>
                {addOpen && <button className="add-btn material-symbols-outlined">note_add</button>}
            </form>

            {addOpen && <div className="add-toolbar" >
                <span className="add-color material-symbols-outlined" title="Add color" onClick={toggleColorChoices}>palette</span>
                <span className="add-txt material-symbols-outlined" title="Add text" onClick={() => onChangeNoteType('NoteTxt')}>text_format</span>
                <span className="add-img material-symbols-outlined" title="Add image" onClick={() => onChangeNoteType('NoteImg')}>image</span>
                <span className="add-vid material-symbols-outlined" title="Add video" onClick={() => onChangeNoteType('NoteVid')}>movie</span>
                {
                    isColorChoicesVisible && (
                        <div
                            className="color-scheme"
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: -50,
                                zIndex: 1,
                            }}
                        >
                            {colorScheme.map((color, idx) => (
                                <span
                                    key={idx}
                                    style={{ backgroundColor: colorCode[idx] }}
                                    title={color}
                                    onClick={() => {
                                        onColorEdit(colorCode[idx])
                                        setColorChoicesVisible(false)
                                    }}
                                    className={`fill color${idx + 1}`}
                                >
                                </span>
                            ))}
                        </div>
                    )
                }
            </div>}
        </div>
    )
}

function DynamicNoteSelector({ type, handleChange, txt, imgUrl, vidUrl}) {
	switch (type) {
		case 'NoteTxt':
			return <NoteTxt handleChange={handleChange} txt={txt} />
		case 'NoteImg':
			return <NoteImg handleChange={handleChange} imgUrl={imgUrl} />
		case 'NoteVid':
			return <NoteVid handleChange={handleChange} vidUrl={vidUrl} />
	}
}



