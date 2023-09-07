import { toolbarIcons } from "../../../services/util.service.js"
const { useState } = React

export function NoteToolbar({ note, onRemoveNote, onDuplicateNote, onChangeColor }) {
    const [isColorChoicesVisible, setColorChoicesVisible] = useState(false)
    const [colorChoicesPosition, setColorChoicesPosition] = useState({ left: 0, top: 0 })
    const colorScheme = ['Default', 'Coral', 'Peach', 'Sand', 'Mint', 'Sage', 'Fog', 'Storm', 'Dusk', 'Blossom', 'Clay', 'Chalk']
    const colorCode = ['white', '#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd', '#e9e3d4', '#efeff1']
    const { changeColor, deleteNote, duplicateNote, circle } = toolbarIcons

    function toggleColorChoices({target}) {
    
        // Calculate the position based on the click event
        const { left, top } = target.getBoundingClientRect()
        setColorChoicesPosition({ left, top: top + target.offsetHeight })
        // Toggle the visibility of the color choices div
        setColorChoicesVisible(!isColorChoicesVisible)
      }

    return (
        <div className="note-toolbar">
            <span title="ChangeColor" onClick={toggleColorChoices}>{changeColor}</span>
            <span title="Duplicate" onClick={() => onDuplicateNote(note)} >{duplicateNote}</span>
            <span title="Delete" onClick={() => onRemoveNote(note.id)}>{deleteNote}</span>
            {isColorChoicesVisible && (
                <div
                    className="color-scheme"
                    style={{
                        position: 'absolute',
                        left: 0,
                        top:`${colorChoicesPosition.top+30}px`,
                        zIndex: 1, // Ensure it's above other content
                    }}
                >
                    {colorScheme.map((color, idx) => (
                        <span
                            key={idx}
                            style={{ backgroundColor: colorCode[idx] }}
                            title={color}
                            onClick={() => {
                                onChangeColor(colorCode[idx], note.id)
                                setColorChoicesVisible(false) 
                            }}
                            className={`fill color${idx + 1}`}
                        >
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}