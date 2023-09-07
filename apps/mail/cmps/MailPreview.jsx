export function MailPreview({ mail }) {
    return (
        <tr className="mail-preview">
            <td>{mail.senderName}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>
        </tr>
    )
}


