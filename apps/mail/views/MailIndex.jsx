import { mailService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailSideBar } from '../cmps/MailSideBar.jsx'
const { useEffect, useState, Fragment } = React
const { Outlet, useSearchParams, useParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())
    const [selectedMailId, setSelectedMailId] = useState(null)

    useEffect(() => {
        console.log('mount')
        console.log('use effect filter',filterBy)
        mailService.query(filterBy).then(mails => setMails(mails))
    }, [filterBy])

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
        })
    }

    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onSelectMailId(mailId) {
        setSelectedMailId(mailId)
    }


    console.log('render')
    if (!mails) return <div>Loading...</div>
    return (
        <section className="mail-index">
            <MailSideBar key="mail-sidebar"/>
            {!selectedMailId &&
                <React.Fragment>
                    <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onSelectMailId={onSelectMailId} />
                </React.Fragment>
            }
            {selectedMailId && <MailDetails onBack={() => onSelectMailId(null)} mailId={selectedMailId} />}
        </section>
    )
}


