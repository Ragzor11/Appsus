export function NoteTxt({ handleChange, txt }) {
    return (
            <input
                onChange={handleChange}
                value={txt || ''}
                type="text"
                name="txt"
                placeholder="Take a note..."
            />
    )
}
