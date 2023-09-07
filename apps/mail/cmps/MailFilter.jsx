const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
console.log(filterBy,'filterBy')
console.log(onSetFilterBy,'onSetFilterBy')
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)


    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log('filtering')
        const field = target.name
        let value = target.value
        console.log(value)
        console.log(target.type)

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt } = filterByToEdit
    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt"></label>
                <input value={txt} onChange={handleChange} type="text" placeholder="Search..." id="txt" name="txt" />
            </form>
        </section>
    )
}