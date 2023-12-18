const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link className="logo-link" to="/">
            <img className="appsus-logo" src="./assets/img/horsehead.svg" alt="App Logo" />
            <h1 className="logo-txt">appSuS</h1>
        </Link>
        <nav>
            <NavLink to="/"><span className="material-symbols-outlined">home</span></NavLink>
            <NavLink to="/mail"><span className="material-symbols-outlined">mail</span></NavLink>
            <NavLink to="/note" ><span className="material-symbols-outlined">note</span></NavLink>
        </nav>
    </header>
}
