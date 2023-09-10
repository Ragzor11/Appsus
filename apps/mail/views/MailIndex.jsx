const { useEffect, useState, Fragment } = React
const { Outlet, useSearchParams, useParams } = ReactRouterDOM
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { mailService } from '../services/mail.service.js'
import { MailSidebar } from '../cmps/MailSideBar.jsx'
import { MailDetails } from '../views/MailDetails.jsx'

export function MailIndex() {
    const [mails, setMails] = useState([])
    const [filter, setFilter] = useState(mailService.getDefaultFilter())
    const [sort, setSort] = useState({ read: 1 })
    const [unreadMailCount, setUnreadMailCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const params = useParams()

    if (params.filter) {
        if (['inbox', 'sent', 'trash', 'draft'].includes(params.filter)) {
            if (filter.status != params.filter) onSetFilter({ status: params.filter, isStarred: null })
        } else if (params.filter === 'starred') {
            if (!filter.isStarred) onSetFilter({ isStarred: true, status: null }) 
        }
    } else {
        if (filter.status || filter.isStarred) onSetFilter({ isStarred: null, status: null })
    }

    useEffect(() => {
        loadMails()
    }, [filter, sort])

    useEffect(() => {
        setFilter(prevFilter => ({ ...prevFilter, txt: searchParams.get('txt') }))
    }, [searchParams])

    useEffect(() => {
        mailService
            .query({ isRead: false })
            .then(mails => {
                setUnreadMailCount(mails.length)
            })
            .catch(console.log)
    }, [mails])

    useEffect(() => {
        document.title = `Appsus Mail (${unreadMailCount})`
    }, [unreadMailCount])

    function onSetFilter(filter) {
        setFilter(prevFilter => ({ ...prevFilter, ...filter }))
    }

    function loadMails() {
        mailService
            .query(filter, sort)
            .then(setMails)
            .catch(() => {
                showErrorMsg('Error fetching emails')
            })
    }

    function onSetMailReadStatus(mailId, isRead) {
        mailService
            .get(mailId)
            .then(mail => {
                if (mail.removedAt) return
                const diff = isRead ? -1 : 1
                setUnreadMailCount(prev => prev + diff)
                const newMail = { ...mail, isRead }
                mailService.save(newMail)
            })
            .catch(() => showErrorMsg('An error occurred '))
    }

    function onRemoveMail(mailId) {
        mailService
            .get(mailId)
            .then(mail => {
                if (mail.removedAt) {
                    onFullDeleteMail(mailId)
                    return
                }
                const newMail = { ...mail, removedAt: Date.now() }
                mailService.save(newMail).then(() => {
                    setMails(mails.filter(mail => mail.id !== mailId))
                    showSuccessMsg('Email moved to Trash')
                })
            })
            .catch(() => showErrorMsg('An error occurred'))
    }

    function onFullDeleteMail(mailId) {
        if (confirm('are you sure you want to delete mail forever?')) {
            mailService
                .remove(mailId)
                .then(() => {
                    // these mails are only shown when we're at the "removed" page, so we can act like we're "deleting" them from that page.
                    setMails(mails.filter(mail => mail.id !== mailId))
                    showSuccessMsg(`Email removed!`)
                })
                .catch(() => showErrorMsg('An error occurred'))
        }
    }

    function restoreMail(mailId) {
        mailService
            .get(mailId)
            .then(mail => {
                const newMail = { ...mail, removedAt: null }
                mailService.save(newMail).then(() => {
                    setMails(mails.filter(mail => mail.id !== mailId))
                    showSuccessMsg('Email restored!')
                })
            })
            .catch(() => showErrorMsg('An error occurred'))
    }
    return (
        <Fragment>
            <main className="mail-index">
                <MailSidebar unreadMailCount={unreadMailCount} active={params.filter} />
                {!params.mailId && (
                    <MailList
                        filter={filter}
                        setFilter={setFilter}
                        sort={sort}
                        onSetSort={setSort}
                        mails={mails}
                        onRemoveMail={onRemoveMail}
                        onSetMailReadStatus={onSetMailReadStatus}
                        restoreMail={restoreMail}
                    />
                )}
                {params.mailId && <MailDetails />}
            </main>
            <Outlet context={loadMails} /> {/* compose mail outlet */}
        </Fragment>
    )
}
