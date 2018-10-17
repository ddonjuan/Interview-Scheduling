import React from 'react';
import {Link} from 'react-router-dom';

const InterviewHomeNavbar = props => {

    return (
        <nav className="blue header">
            <div className="nav-wrapper">
                <Link to="/interviewer-homepage"className="home-nav-logo">Allergan USC</Link>

                <ul className="right nav-items">
                    <li>
                        <Link to="interviewer-homepage">Candidates</Link>
                    </li> 

                    <li>
                        <Link to="/">Day 1</Link>
                    </li>

                    <li>
                        <Link to="/chat-rooms">Day 2</Link>
                    </li>
                    <li>
                        <Link to="/create-room">Day 3</Link>
                    </li>
                    <li>
                        <i className="material-icons icon">person</i> UserId
                    </li>    
                </ul>
            </div>
        </nav>
    );
}

export default InterviewHomeNavbar;