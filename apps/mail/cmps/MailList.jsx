import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {
    console.log(mails)
    return (
        <table className="mail-container" key="mail-container">
            <tbody className="mail-list" >
                {mails.map(mail =>
                        <MailPreview mail={mail} />
                )}
            </tbody>
        </table>
    )
}
