const { Link } = ReactRouterDOM
const { useEffect } = React
export function Home() {
	useEffect(() => {
		document.title = 'appSus'
	}, [])

	return (
		<main className="home">
			<section className="img-container">
				<h1>Design and software solution you can rely on!</h1>
				<img src="./assets/img/computer.jpg"></img>
			</section>

        </main>
    )
}