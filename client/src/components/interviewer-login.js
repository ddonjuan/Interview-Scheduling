import React, { Component } from 'react';
// import {handleInput} from './helpers/handle-input-helper';
import axios from 'axios';


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
    async handleSubmit(event){
        event.preventDefault();
        console.log("this is the state when submitted: ", this.state);
        var query = this.state;
        await axios.post("http://localhost:8888/login.php", {query}).then(response => {
            console.log("AXIOS RESPONSE",response);
            if(response.data.success){
                this.props.history.push("/interviewer-homepage");
            } else {
                console.log("LOGIN FAILED");
            }
        });
    }
    render() {
        console.log("props in the login component: ", this.props);
        const {userName, password} = this.state;
        console.log("this is the state afterwards: ", this.state);
        return (
            <div className="container login-container">
                <div className="row">
                    <form className="col s6 offset-s3">
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="userName" value={userName} onChange={this.handleInputChange} id="interviewer-login" type="text" className="validate" />
                                <label for="interviewer-login" className="active">User Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input name="password" value={password} onChange={this.handleInputChange} id="interviewer-password" type="password" className="validate" />
                                <label for="interviewer-password" className="active">Password</label>
                            </div>
                        </div>
                        <button onClick={this.handleSubmit} className="waves-effect waves-teal btn-large login-submit">Log In</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default InterviewerLogin;