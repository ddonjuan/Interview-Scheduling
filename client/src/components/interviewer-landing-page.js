import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class InterviewerLandingPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <Link to="/interviewer-login" className="waves-effect waves-teal btn-large login">Log In</Link>
                <Link to="/interviewer-signup" className="waves-effect waves-teal btn-large signup">Sign Up</Link>
            </div>
        )
    }
}
export default InterviewerLandingPage;