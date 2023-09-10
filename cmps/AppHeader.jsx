const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link className="logo-link" to="/">
            <img className="appsus-logo" src="./assets/img/horsehead.svg" alt="App Logo" />
            <h1 className="logo-txt">appSuS</h1>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
