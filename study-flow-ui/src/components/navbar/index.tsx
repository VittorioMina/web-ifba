import './index.scss'

function Navbar() {
    return (
        <>
            <nav id="nav">
                <div className="logo">
                    <img src="/assets/images/logo.png" alt="StudyFlow logo" />
                    <span>StudyFlow</span>
                </div>
                <div className="search-input">
                    <input
                        className="input-text"
                        type="search"
                        name="search-task"
                        placeholder="Pesquisar"
                    />
                </div>
                <div className="links">
                    <div className="navbar-link">
                        <img className="link-icon" src="/assets/svgs/pin-icon.svg" alt="icon" />
                        <a href="/pages/tasks/index.html">Minhas Tarefas</a>
                    </div>
                </div>
            </nav>

            <nav id="nav-mobile">
                <div className="logo">
                    <div>
                        <img src="/assets/images/logo.png" alt="StudyFlow logo" />
                        <span>StudyFlow</span>
                    </div>
                </div>
                <div className="search-input">
                    <input
                        className="input-text"
                        type="search"
                        name="search-task"
                        placeholder="Pesquisar"
                    />
                </div>

                <div className="navbar-link">
                    <img className="link-icon" src="/assets/svgs/pin-icon.svg" alt="icon" />
                    <a href="/pages/tasks/index.html">Tarefas</a>
                </div>
            </nav>
        </>
    )
}

export default Navbar