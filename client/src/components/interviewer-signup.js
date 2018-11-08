import React, { Component } from 'react';
import SelectDropDown from './helpers/select-element';
import { Link } from 'react-router-dom';

class InterviewerSignup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            email: '',
            c_email: '',
            department: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
    }
    componentWillMount(){
        this.props.switchNav();
        this.props.hideDropDown();
    }
    handleInputChange(event){
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }
    handleSelectDepartment(event) {
        const dropDownClicked = event.target.value;
        console.log("this is the item clicked: ", dropDownClicked);
        this.setState({
            department: dropDownClicked
        });

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
        console.log("this is the state: ", this.state)
        const {enableSubmit} = this.props;
        const submitButton = enableSubmit ? <Link to="/interviewer-homepage" className="waves-effect waves-light btn-large">Create</Link> : <button className="btn-large disabled">Create</button>
        const { inputChange, uploadChange } = this.props;
        const { firstname, lastname, username, password, email, c_email} = this.state;
        return (
            <div className="container step-1-page">
                <h3 className="center">Please fill out form.</h3>
                <div className="divider"></div>
                <form className="col s12" action="">
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleInputChange} name="firstname" value={firstname} id="firstName" type="text" className=""/>
                            <label for="firstName" className="active">First Name</label>
                            <div className="hidDiv firstName">Field must contain at least one character</div>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleInputChange} name="lastname" value={lastname} id="lastName" type="text" className=""/>
                            <label for="lastName" className="active">Last Name</label>
                            <div className="hidDiv lastName">Invalid Input. Field must contain at least one character</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input onChange={this.handleInputChange} name="username" value={username} id="userName" type="text" className=""/>
                            <label for="userName" className="active">User Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.handleInputChange} name="password" value={password} id="password" type="password" className=""/>
                            <label for="password" className="active">Password</label>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.handleInputChange} name="email" value={email} id="email" type="email" className=""/>
                            <label for="email" className="active">Email</label>
                            <div className="hidDiv email">Invalid Input. Field must contain '@'</div>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.handleInputChange } name="c_email" id="c_email" type="email" value={c_email} className=""/>
                            <label for="c_email" className="active">Confirm Email</label>
                            <div className="hidDiv c_email">Email address does not match</div>
                            <div className="hidDiv c_emailRight">Email Matches</div>
                        </div>
                        <SelectDropDown id="function-list" submit={this.handleSelectDepartment} selectTitle="Department" value={['Default', 'Clinical Development', 'Medical Affairs', 'Global Regulatory Affairs', 'Clinical Pharmacology']} selectClasses="col s3 sort-function-option" />
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