import './About.css'

export default function About() {
    return (
        <article className="About">
            <header>
                <h3>About</h3>
            </header>
            <p>This is a PERN (full-stack) web blog created by Matthew Willis as part of the Codecademy Full-Stack Engineer course. <br></br> It takes inspiration from most blog sites and Reddit when it comes to commments and posts.</p>
            <p>If you find any issues or you'd like to give feedback, please submit them on <a href="https://github.com/MWillis10231/full-stack-blog" target="_blank" rel="noreferrer">GitHub</a></p>
            <p>If you'd like to learn more about the technologies behind the stack:</p>
            <ul>
                <li><a href="https://www.postgresql.org/" target="_blank" rel="noreferrer">
                <strong>P</strong>ostgreSQL
            </a></li>
                <li><a href="https://www.expressjs.com/" target="_blank" rel="noreferrer">
                <strong>E</strong>xpress
                </a></li>
                <li><a href="https://reactjs.org/" target="_blank" rel="noreferrer"><strong>R</strong>eact</a> / <a href="https://redux.js.org/" target="_blank" rel="noreferrer"><strong>R</strong>edux</a></li>
                <li><a href="https://nodejs.org/" target="_blank" rel="noreferrer"><strong>N</strong>ode.js</a></li>
            </ul>
        </article>
    )
}