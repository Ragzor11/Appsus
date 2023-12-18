const { Fragment } = React
export function NoteVid({ handleChange, vidUrl }) {
  return (
    <Fragment>
      <input
        onChange={handleChange}
        value={vidUrl || ""}
        type="text"
        name="vidUrl"
        placeholder="Please insert video url..."
      />
      {vidUrl && <iframe className="video" src={vidUrl} alt=""></iframe>}
    </Fragment>
  )
}
