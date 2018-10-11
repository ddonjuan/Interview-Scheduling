import React, { Component } from 'react';

class InterviwerSignup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container interviewer-signup">
                <h5 className="center">Create Log In</h5>
                <div className="row">
                    <form action="" className="col s12">
                        <div className="row in">
                            <div className="input-field col s6 in">
                                <input id="interviewer-first-name" type="text" className="validate" />
                                <label for="interviewer-first-name" className="active">First Name</label>
                            </div>
                        </div>
                        {/* <div className="row in">
                            <div class="input-field col s6 in">
                                <input id="interviewer-last-name" type="text" className="validate" />
                                <label for="interviewer-last-name" className="active">Last Name</label>
                            </div>
                        </div>

                        <div className="row in">
                            <div className="input-field col s6 in">
                                <input id="interviewer-email" type="email" className="validate" />
                                <label for="interviewer-email" className="active">Email</label>
                            </div>
                        </div> */}
                        <div className="row in">
                            <div className="input-field col s6 in">
                                <input id="interviewer-password" type="password" className="validate" />
                                <label for="interviewer-password" className="active">Password</label>
                            </div>
                        </div>
                        <div className="row in">
                            <div className="input-field col s6 in">
                                <input id="interviewer-confirm-password" type="password" className="validate" />
                                <label for="interviewer-confirm-password" className="active">Confirm Password</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light center submit-b" type="submit" name="action">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default InterviwerSignup;