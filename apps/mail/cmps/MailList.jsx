import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    console.log(mails)
    return (
        <table className="mail-container" key="mail-container">
            <tbody className="mail-list">
                {mails.map(mail =>
                    <tr key={mail.id}>
                        <MailPreview mail={mail} />
                    </tr>
                )}
            </tbody>
        </table>
    )
}
