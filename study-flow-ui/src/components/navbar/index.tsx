import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

function Navbar() {
    return (
        <>
            <nav id="nav">
                <div className="logo">
                    <Link className="link" to="/">
                        <img src="/assets/images/logo.png" alt="StudyFlow logo" />
                        <span>StudyFlow</span>
                    </Link>
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
                        <Link to="/register">Cadastrar Produto</Link>
                    </div>
                </div>
            </nav>

            <nav id="nav-mobile">
                <div className="logo">
                    <div>
                        <Link to="/">
                            <img src="/assets/images/logo.png" alt="StudyFlow logo" />
                            <span>StudyFlow</span>
                        </Link>
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
                    <Link to="/register">Cadastrar Produto</Link>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
