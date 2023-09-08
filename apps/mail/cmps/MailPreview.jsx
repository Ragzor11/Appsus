import { mailService } from "../services/mail.service.js"
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailPreview({ mail, onRemoveMail }) {
    const navigate = useNavigate()
    const [isStarred, setIsStarred] = useState(mail.isStarred)
    const [isRead, setIsRead] = useState(mail.isRead)
    useEffect(() => {
        mailService.save({ ...mail, isStarred })
    }, [isStarred])


    function handleMailOpening() {
        navigate(`/mail/${mail.id}`)
    }
    function handleMailStarring(ev) {
        ev.stopPropagation()
        setIsStarred(prev => !prev)
        console.log(isStarred)

    }
    function handleMailToTrash(ev) {
        ev.stopPropagation()
        onRemoveMail(mail.id)
    }
    const isStarredClass = isStarred ? 'starred' : 'un-starred'

    return (
        <tr onClick={handleMailOpening} className="mail-preview">
            <td><i onClick={handleMailStarring} className={`${isStarredClass} material-symbols-outlined`} title="Star mail">star</i>
            <i onClick={handleMailToTrash} className="material-symbols-outlined" title="Move to trash">delete</i>
            </td>
            <td >{mail.senderName}</td>
            <td >{mail.subject}</td>
            <td >{mail.body}</td>
            <td >{mail.sentAt}</td>
        </tr>
    )
}


