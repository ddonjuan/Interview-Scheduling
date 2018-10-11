import React, {Component} from 'react';

class InterviewerLandingPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <button className="waves-effect waves-teal btn-large login">Log In</button>
                <button className="waves-effect waves-teal btn-large signup">Sign Up</button>
            </div>
        )
    }
}
export default InterviewerLandingPage;