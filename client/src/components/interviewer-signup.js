import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class InterviwerSignup extends Component {
    constructor(props) {
        super(props);

        this.state= {
            username: '',
            password: '',
            confirmPassword: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        event.preventDefault();
    }
    render() {
        console.log("this is the state in the create login name: ", this.state);
        return (
            <div className="container interviewer-signup">
                <h5 className="center">Create Log In</h5>
                <div className="row">
                    <form onClick={this.handleSubmit} action="" className="col s12">
                        <div className="row in">
                            <div className="input-field col s6 in">
                                <input onChange={this.handleInputChange} name="username" id="interviewer-user-name" type="text" className="validate" />
                                <label for="interviewer-user-name" className="active">User Name</label>
                            </div>
                        </div>
                        <div className="row in">
                            <div className="input-field col s6 in">
                                <input onChange={this.handleInputChange} name="password" valueid="interviewer-password" type="password" className="validate" />
                                <label for="interviewer-password" className="active">Password</label>
                            </div>
                        </div>
                        <div className="row in">
                            <div className="input-field col s6 in">
                                <input onChange={this.handleInputChange} name="confirmPassword" id="interviewer-confirm-password" type="password" className="validate" />
                                <label for="interviewer-confirm-password" className="active">Confirm Password</label>
                            </div>
                        </div>
                        <Link to="/interviewer-info" className="btn waves-effect waves-teal btn-large submit-b" >Create Account</Link>
                    </form>
                    
                </div>
            </div>
        )
    }
}
export default InterviwerSignup;