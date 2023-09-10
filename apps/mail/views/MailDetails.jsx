const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { showErrorMsg} from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
	const [mail, setMail] = useState()
	const { mailId } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		loadMail()
	}, [mailId])

	function loadMail() {
		mailService
			.get(mailId)
			.then(setMail)
			.catch(() => {
				showErrorMsg('mail not found')
				navigate('/mail')
			})
	}

	if (!mail) return <span className="loader"></span>
	const timeReceived = utilService.formatMailDate(mail.sentAt)
	return (
		<section className="mail-details">
			<div className="top-container">
				<div>
					<h1>{mail.subject}</h1>
					<h6>from {mail.from}</h6>
				</div>
				<h5>{timeReceived}</h5>
			</div>
			<div className="mail-body">
				<img className="mail-user-img" src="../../../assets/img/senderlogo.png" alt="" />
				<p>{mail.body}</p>
			</div>
		</section>
	)
}
