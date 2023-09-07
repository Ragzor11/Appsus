export function MailPreview({ mail }) {
    console.log(mail)
    return (
        <tr className="mail-preview" key="mail.id">
            <td>{mail.senderName}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>
        </tr>
    )
}


