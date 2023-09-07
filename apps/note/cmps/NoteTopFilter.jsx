import { toolbarIcons } from "../../../services/util.service.js"
const { useState, useEffect } = React

export function NoteTopFilter({ filterBy, onSetFilterBy }) {
    const { searchIcon } = toolbarIcons
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

    const { search } = filterByToEdit

    return (
        <section className='note-filter'>
            <form onSubmit={onSubmitFilter}>
                <div className="search-container">
                    <div className="search-icon">{searchIcon}</div>
                    <input
                        value={search}
                        onChange={handleChange}
                        type='search'
                        placeholder='Search'
                        name='search'
                    />
                </div>
            </form>
        </section>
    )
}
