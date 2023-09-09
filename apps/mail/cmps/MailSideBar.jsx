const { Link } = ReactRouterDOM

export function MailSideBar() {
    return (
        <section className="mail-sidebar">
            <Link className="compose-icon-container" to="/mail/compose">
                <span className="compose-icon material-symbols-outlined" title="Compose mail">edit</span>
            </Link>
            <button>Inbox</button>
            <button>Starred</button>
            <button>Sent</button>
        </section>

    )
}