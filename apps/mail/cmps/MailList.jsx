import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails,onRemoveMail }) {
    console.log(mails)
    return (
        <table className="mail-container" key="mail-container">
            <tbody className="mail-list" key="mail-list" >
                {mails.map(mail =>
                        <MailPreview 
                        mail={mail} 
                        key={mail.id} 
                        onRemoveMail={onRemoveMail}
                        />
                )}
            </tbody>
        </table>
    )
}
