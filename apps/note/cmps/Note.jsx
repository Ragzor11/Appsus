export function Note({ note }) {

    console.log('note', note)


   // const bgColor = note.style.backgroundColor || 'white'
    //const style = { backgroundColor: bgColor, }


    return (
        <div className="note" > 
        {/* style={style} */}
            {note.type === 'noteImg' && <img src={note.info.url} alt="" />}
            {note.info.title && <h1>{note.info.title} </h1>}
            {note.info.txt && <p>{note.info.txt} </p>}
        </div>
    )
}