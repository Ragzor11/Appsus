const { useState, useEffect } = React

export function NoteTopFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const searchIcon = <svg
        className="search-icon" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M 20.49 19 l -5.73 -5.73 C 15.53 12.2 16 10.91 16 9.5 C 16 5.91 13.09 3 9.5 3 S 3 5.91 3 9.5 C 3 13.09 5.91 16 9.5 16 c 1.41 0 2.7 -0.47 3.77 -1.24 L 19 20.49 L 20.49 19 Z M 5 9.5 C 5 7.01 7.01 5 9.5 5 S 14 7.01 14 9.5 S 11.99 14 9.5 14 S 5 11.99 5 9.5 Z" fill="black"></path>
    </svg>
    const { search } = filterByToEdit

    return (
        <section className='note-filter'>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor='search'>
                    {searchIcon}
                </label>
                <input
                    value={search}
                    onChange={handleChange}
                    type='search'
                    placeholder=' Search'
                    id='search'
                    name='search'
                />
            </form>
        </section>
    )
}
