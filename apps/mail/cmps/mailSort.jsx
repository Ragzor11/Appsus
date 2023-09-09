import { eventBusService } from '../services/event-bus.service.js'
const { useState, useRef } = React



export function MailSort({ onSortBy, sort }) {
    const [searchValue, setSearchValue] = useState(null)
    const inputRef = useRef()


    function onSort(type) {
        const newSort = sort[type] ? sort[type] * -1 : 1
        onSortBy({ [type]: newSort })
    }
    function handleChange({ target: { value } }) {
        eventBusService.emit('input-changed', value)
        setSearchValue(value)
    }
    function onSetFocus() {
        inputRef.current.focus()
    }

    return (
        <form onSubmit={ev => ev.preventDefault()} className="mail-sort">
            <button onClick={() => onSort('read')} className="sort-by-read">
                read
                {sort.read === 1 && <span className="material-symbols-outlined">arrow_downward</span>}
                {sort.read === -1 && <span className="material-symbols-outlined">arrow_upward</span>}
            </button>
            <button onClick={() => onSort('starred')} className="sort-by-starred">
                starred
                {sort.starred === 1 && <span className="material-symbols-outlined">arrow_downward</span>}
                {sort.starred === -1 && <span className="material-symbols-outlined">arrow_upward</span>}
            </button>
            <button onClick={() => onSort('date')} className="sort-by-date">
                date
                {sort.date === 1 && <span className="material-symbols-outlined">arrow_downward</span>}
                {sort.date === -1 && <span className="material-symbols-outlined">arrow_upward</span>}
            </button>
            <div className="input-container">
                <span onClick={onSetFocus} title="search" className="material-symbols-outlined">
                    search
                </span>
                <input
                    ref={inputRef}
                    value={searchValue}
                    onChange={handleChange}
                    type="text"
                    placeholder={`Search mail`}
                />
            </div>
        </form>
    )
}
