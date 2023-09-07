import { NoteToolbar } from "./NoteToolbar.jsx"
export function Note({ note }) {
    const { id, info: { txt, title, url, todos }, type, style } = note

    const bgColor = style && style.backgroundColor ? note.style.backgroundColor : 'white'
    const bgStyle = { backgroundColor: bgColor, }

    return (
        <div className="note" style={bgStyle}  >

            {type === 'NoteImg' && <img src={url} alt="image!" /> }
            {title && <h1 contentEditable={true} suppressContentEditableWarning={true} placeholder="Title"><span>Title: </span>{title} </h1>}
            {txt && <p contentEditable={true} suppressContentEditableWarning={true} placeholder="Text"><span>Text: </span>{txt} </p>}
            <NoteToolbar
				// onSetNoteStyle={onSetCurrentNoteStyle}
				note={note}
				// onRemoveNote={onRemoveNote}
				// duplicateNote={duplicateNote}
			/>
        </div>
    )
}