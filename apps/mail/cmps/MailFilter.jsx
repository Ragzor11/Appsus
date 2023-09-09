const { useEffect, Fragment } = React
const { useNavigate, useSearchParams } = ReactRouterDOM

import { eventBusService } from '../../../services/event-bus.service.js'
export function MailFilter({ active, isExpanded, unreadMailCount }) {
	const [searchParams, setSearchParams] = useSearchParams()
	const navigate = useNavigate()

	useEffect(() => {
		const unsubscribe = eventBusService.on('input-changed', txt => {
			setSearchParams({ txt })
		})
		return unsubscribe
	}, [])

	function setFilter(path) {
        console.log(path)
		if (active === path) navigate('/mail')
		else navigate(`/mail/${path}`)
	}

	return (
		<ul className="clean-list mail-filter">
			<li className={active === 'inbox' ? 'active' : ''} onClick={() => setFilter('inbox')}>
				<span className="material-symbols-outlined">inbox</span>
				{isExpanded && (
					<Fragment>
						<span>Inbox</span>
						{unreadMailCount > 0 && <span className="unread-mail-count">{unreadMailCount}</span>}
					</Fragment>
				)}
			</li>
			<li className={active === 'starred' ? 'active' : ''} onClick={() => setFilter('starred')}>
				<span className="material-symbols-outlined">star</span>
				{isExpanded && <span>Starred</span>}
			</li>
			<li className={active === 'sent' ? 'active' : ''} onClick={() => setFilter('sent')}>
				<span className="material-symbols-outlined">send</span>
				{isExpanded && <span>Sent</span>}
			</li>
			<li className={active === 'trash' ? 'active' : ''} onClick={() => setFilter('trash')}>
				<span className="material-symbols-outlined">Delete</span>
				{isExpanded && <span>Trash</span>}
			</li>
		</ul>
	)
}
