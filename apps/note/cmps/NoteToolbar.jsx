import { toolbarIcons } from "../../../services/util.service.js"
const { useState } = React
const { Fragment } = React

export function NoteToolbar({ note, onRemoveNote, onDuplicateNote, onColorEdit }) {
    const [isColorChoicesVisible, setColorChoicesVisible] = useState(false)
    const [colorChoicesPosition, setColorChoicesPosition] = useState({ left: 0, top: 0 })
    const colorScheme = ['Default', 'Coral', 'Peach', 'Sand', 'Mint', 'Sage', 'Fog', 'Storm', 'Dusk', 'Blossom', 'Clay', 'Chalk']
    const colorCode = ['white', '#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd', '#e9e3d4', '#efeff1']

    function toggleColorChoices({ target }) {
        // Calculate the position based on the click event
        const { left, top } = target.getBoundingClientRect()
        setColorChoicesPosition({ left, top: top + target.offsetHeight })
        // Toggle the visibility of the color choices div
        setColorChoicesVisible(!isColorChoicesVisible)
    }



    return (
        <Fragment>
            <div className="note-toolbar">
                <span className="material-symbols-outlined" title="ChangeColor" onClick={toggleColorChoices}>palette</span>
                <span className="material-symbols-outlined" title="Duplicate" onClick={() => onDuplicateNote(note)}>content_copy</span>
                <span className="material-symbols-outlined" title="Delete" onClick={() => onRemoveNote(note.id)}>delete</span>
            </div>
            {isColorChoicesVisible && (
                <div
                    className="color-scheme"
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: -50,
                        // top: `${colorChoicesPosition.top}px`,
                        zIndex: 1,
                    }}
                >
                    {colorScheme.map((color, idx) => (
                        <span
                            key={idx}
                            style={{ backgroundColor: colorCode[idx] }}
                            title={color}
                            onClick={() => {
                                onColorEdit(colorCode[idx], note)
                                setColorChoicesVisible(false)
                            }}
                            className={`fill color${idx + 1}`}
                        >
                        </span>
                    ))}
                </div>
            )}
        </Fragment>
    )
}
