import { toolbarIcons } from "../../../services/util.service.js"


export function NoteToolbar({ note }) {
    const { changeColor, deleteNote, duplicateNote} = toolbarIcons
    console.log('note in noteMEnu', note);

    return (
        <div className="note-toolbar">
            <span title="Change Color">{changeColor}</span>
            <span title="Duplicate Note">{duplicateNote}</span>
            <span title="Delete Note">{deleteNote}</span>
        </div>
    )

}