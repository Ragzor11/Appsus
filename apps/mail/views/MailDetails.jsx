import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mailService
            .get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('error getting mail', err)
                navigate('/mail')
            })
    }, [mailId])
if(!mail) return <div>Loading Mail...</div>
    return (
<section className="mail-details">
    <h2>{mail.subject}</h2>
    <h3><img src ='../../../assets/img/senderLogo.png'/> {mail.senderName}({mail.senderMail})</h3>
    <h4>{mail.sentAt}</h4>
    <h3>{mail.to}</h3>
    <p>{mail.body}</p>



</section>
    )
}