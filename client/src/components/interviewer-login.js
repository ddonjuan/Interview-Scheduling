import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {handleInput} from './helpers/handle-input-helper';


class InterviewerLogin extends Component {
    constructor(props) {
        super(props);
        this.state={
            userName: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event){
        const {value, name} = event.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event){
        event.preventDefault();
        console.log("this is the state when submitted: ", this.state);
    }
    render() {
        console.log("props in the login component: ", this.props);
        const {switchNav} = this.props;
        const {userName, password} = this.state;
        console.log("this is the state afterwards: ", this.state);
        return (
            <div className="container login-container">
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="col s6 offset-s3">
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="userName" value={userName} onChange={this.handleInputChange} id="interviewer-login" type="text" className="validate" />
                                <label for="interviwer-login" className="active">User Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="password" value={password} onChange={this.handleInputChange} id="interviewer-password" type="password" className="validate" />
                                <label for="interviwer-password" className="active">Password</label>
                            </div>
                        </div>
                        <Link to="/interviewer-homepage" onClick={()=>{switchNav()}}className="waves-effect waves-teal btn-large login-submit">Log In</Link>
                    </form>
                </div>
            </div>
        )
    }
}
export default InterviewerLogin;