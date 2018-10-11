import React, { Component } from 'react';

class InterviewerLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="interviewer-login" type="text" className="validate" />
                                <label for="interviwer-login">User Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="interviewer-password" type="password" className="validate" />
                                <label for="interviwer-password">Password</label>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default InterviewerLogin;