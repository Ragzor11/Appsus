export function MailPreview({ mail }) {
    console.log(mail)
    return (
        <article className="mail-preview" key="mail-preview">
            <td>{mail.senderName}</td>
            <td>{mail.subject}</td>
            <td>{mail.body}</td>
            <td>{mail.sentAt}</td>
        </article>
    )
}


