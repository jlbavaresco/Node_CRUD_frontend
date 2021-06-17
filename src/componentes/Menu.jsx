import React from 'react';

const Menu = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    
                    <a className="nav-item nav-link" href="/estado">CRUD Estado</a>
                    <a className="nav-item nav-link" href="/cidade">CRUD Cidade</a>
                    <a className="nav-item nav-link" href="/pessoa">CRUD Pessoa</a>
                </div>
            </div>
        </nav>



    );
}

export default Menu;