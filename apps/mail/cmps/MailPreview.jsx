export function MailPreview({ mail }) {
    console.log(mail)
    return (
        <article className="mail-preview">
            <p>{mail.from}</p>
            <p>{mail.subject}</p>
            <p>{mail.body}</p>
        </article>
    )
}


