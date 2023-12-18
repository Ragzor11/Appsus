const { Fragment } = React
export function NoteImg({ handleChange, imgUrl }) {
  return (
    <Fragment>
      <input
        onChange={handleChange}
        value={imgUrl || ""}
        type="text"
        name="imgUrl"
        placeholder="Please insert image url..."
      />
      {imgUrl && <img className="img" src={imgUrl} alt=""></img>}
    </Fragment>
  )
}
