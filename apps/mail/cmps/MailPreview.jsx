const { useParams, useNavigate, Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    const navigate = useNavigate()

	function handleMailOpening(ev) {
		ev.stopPropagation()
		navigate(`/mail/${mail.id}`)
	}
    return (
        <tr onClick={handleMailOpening} className="mail-preview">
            <td><i class="fa-regular fa-star"></i> <i class="fa-solid fa-trash"></i></td>
            <td>{mail.senderName}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>
        </tr>
    )
}


