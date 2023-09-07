const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilterBy }) {
    console.log(filterBy, 'filterBy')
    console.log(onSetFilterBy, 'onSetFilterBy')
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [textClicked, setTextClicked] = useState(false)


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
    function onClick() {
        console.log('clicked');
    }

    const { txt } = filterByToEdit
    return (
        <section className="mail-filter">
            <form className="search-box"
                onSubmit={onSubmitFilter}>
                <i class="fa-solid fa-magnifying-glass"></i>
                <input onClick={onClick} value={txt} onChange={handleChange} type="text" placeholder="Search mail" id="txt" name="txt" />

            </form>
        </section>
    )
}