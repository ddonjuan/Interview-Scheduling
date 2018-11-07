import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InterviewerSignup extends Component {
    constructor(props) {
        super(props)
    }
    emailValidation(name, value){
        var emailFlag = false;
    
          if(name === 'email'){
            var emailCheck = /[@]/;
            var testEmail = emailCheck.test(value);
            emailFlag = false;
            if(testEmail){
                this.showValid(name);
                if(emailCheck){
                    this.emailConfirmCheck(name);
                }
                return;
              }
              this.showInvalid(name);
              this.setState({
                  cEmailCheck: false
              })
          }
          if(name === 'c_email'){
            const {email} = this.state;
            if(value === email){
                this.showValid(name);
                document.getElementsByClassName(name+"Right")[0].classList.add("showCEmail");
                emailCheck = true;
                this.setState({
                    cEmailCheck: true
                });
                return
            }
            this.showInvalid(name);
            document.getElementsByClassName(name+"Right")[0].classList.remove("showCEmail");
            this.setState({
                cEmailCheck: false
            });
          }
        }    
    render() {
        const {enableSubmit} = this.props;
        const submitButton = enableSubmit ? <Link to="/interviewer-homepage" className="waves-effect waves-light btn-large">Create</Link> : <button className="btn-large disabled">Create</button>
        const { inputChange, uploadChange } = this.props;
        const { firstName, lastName, userName, password, email, c_email, department } = this.props;
        return (
            <div className="container step-1-page">
                <h3 className="center">Please fill out form.</h3>
                <div className="divider"></div>
                <form className="col s12" action="">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="First Name" onChange={inputChange} name="firstName" value={firstName} id="firstName" type="text" className=""/>
                            <label for="firstName" className="active">First Name</label>
                            <div className="hidDiv firstName">Field must contain at least one character</div>
                        </div>
                        <div className="input-field col s6">
                            <input placeholder="Last Name" onChange={inputChange} name="lastName" value={lastName} id="lastName" type="text" className=""/>
                            <label for="lastName" className="active">Last Name</label>
                            <div className="hidDiv lastName">Invalid Input. Field must contain at least one character</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input placeholder="User Name" onChange={inputChange} name="userName" value={userName} id="userName" type="text" className=""/>
                            <label for="userName" className="active">User Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input placeholder="Password" onChange={inputChange} name="password" value={userName} id="password" type="text" className=""/>
                            <label for="password" className="active">Password</label>
                        </div>
                        <div className="input-field col s12">
                            <input placeholder="Email" onChange={inputChange} name="email" value={email} id="email" type="email" className=""/>
                            <label for="email" className="active">Email</label>
                            <div className="hidDiv email">Invalid Input. Field must contain '@'</div>
                        </div>
                        <div className="input-field col s12">
                            <input placeholder="Confirm Email" onChange={inputChange } name="c_email" id="c_email" type="email" value={c_email} className=""/>
                            <label for="c_email" className="active">Confirm Email</label>
                            <div className="hidDiv c_email">Email address does not match</div>
                            <div className="hidDiv c_emailRight">Email Matches</div>
                        </div>
                        <div className="input-field col s12">
                            <input placeholder="Department" onChange={inputChange} name="department" value={userName} id="department" type="text" className=""/>
                            <label for="department" className="active">Department</label>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col s4 push-s5">
                        {submitButton}
                    </div>
                </div>
            </div>
        )
    }
}
export default InterviewerSignup;