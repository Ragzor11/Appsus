import { MailPreview } from './MailPreview.jsx'
import { MailSort } from './mailSort.jsx'

export function MailList({ mails, onSetMailReadStatus, onRemoveMail, restoreMail, sort, onSetSort, filter, filterBy }) {
	return (
		<div className="mail-list-container">
			<MailSort onSortBy={onSetSort} sort={sort} filter={filter} filterBy={filterBy} />
			{!!mails.length && (
				<ul className="clean-list mail-list">
					{mails.map(mail => (
						<MailPreview
							key={mail.id}
							mail={mail}
							onRemoveMail={onRemoveMail}
							onSetMailReadStatus={onSetMailReadStatus}
							restoreMail={restoreMail}
						/>
					))}
				</ul>
			)}
			{!mails.length && <h1 className="no-mails-info">No mails here</h1>}
		</div>
	)
}
