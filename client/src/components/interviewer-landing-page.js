import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InterviewerLandingPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="center-align login-button-container">
                    <Link to="/interviewer-login" className="waves-effect waves-teal btn-large login">Log In</Link>
                </div>

            </div>
        )
    }
}
export default InterviewerLandingPage;