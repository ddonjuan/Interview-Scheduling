import React, { Component } from 'react';
import SelectDropDown from './helpers/select-element';
import Modal from './helpers/modal';
import { showElement} from './helpers/handle-input-helper';
import { Link } from 'react-router-dom';
import axios from 'axios';

class InterviewerSignup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            c_password: '',
            email: '',
            department: '',
            firstNameCheck: false,
            lastNameCheck: false,
            usernameCheck: false,
            passwordCheck: false,
            c_passwordCheck: false,
            emailCheck: false,
            departmentCheck: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        
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
        this.inputValidation(name, value);
    }

    inputValidation(name, value){
        switch(name){
            case 'firstname':
            case 'lastname':
            case 'username':
                this.nameInputCheck(name, value);
                break;
            case 'password':
            case 'c_password':
                this.passwordCheck(name, value);
                break;
            case 'email':
                this.emailCheck(name, value);
                break;
            case 'department':
                this.departmentCheck(name, value);
                break;    
            default:
                break;        
        }
    }
    nameInputCheck(name, value){
        if(value.length > 0){
            switch(name){
                case 'firstname':
                    this.setState({
                        firstNameCheck: true
                    });
                    this.showValid(name);
                    break;
                case 'lastname':
                    this.setState({
                        lastNameCheck: true
                    });
                    this.showValid(name);
                    break;
                case 'username':
                    this.setState({
                        usernameCheck: true
                    });
                    this.showValid(name);
                    break;
                default:
                    break;        
            }
            return
        }
        this.showInvalid(name) 
    }

    passwordCheck(name, value){
        if(name === 'password'){
            const{passwordCheck, c_password, password} = this.state;
            let passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            let checkPassword = passwordReg.test(value);
            if(checkPassword){
                this.showValid(name);
                this.setState({
                    passwordCheck: true
                });
                return;
            }
            this.showInvalid(name);
            this.setState({
                passwordCheck: false,
                c_passwordCheck: false
            });

            if(document.getElementsByClassName("c_passwordPass")[0].classList.contains("showCEmail")){
                document.getElementsByClassName("c_passwordPass")[0].classList.remove("showCEmail");
                this.showInvalid("c_password");
             }
        }
        if(name === 'c_password'){
            this.confirmPasswordCheck(name, value);
        }
    }
    passwordEmailConfirm(){
        const {password, c_password, passwordCheck, email, c_email, emailCheck} = this.state;
        if(password !=='' && c_password !== '' && password === c_password && passwordCheck){
            document.getElementsByClassName("c_passwordPass")[0].classList.add("showCEmail");
            this.showValid("c_password");
            return;
        }
    }
    confirmPasswordCheck(name, value){
            const {password} = this.state;
            if(value === password && this.state.passwordCheck){
                this.setState({
                    c_passwordCheck: true
                });
                this.showValid(name);
                document.getElementsByClassName(name+"Pass")[0].classList.add("showCEmail");
                return
            }
            this.setState({
                c_passwordCheck: false
            });
            this.showInvalid(name);
            document.getElementsByClassName(name+"Pass")[0].classList.remove("showCEmail");
    }

    showValid(name){
        document.getElementById(name).classList.remove("invalid", "showDiv");
        document.getElementById(name).classList.add("valid");
        document.getElementsByClassName(name)[0].classList.remove("showDiv");
      }

      showInvalid(name){
        document.getElementById(name).classList.remove("valid");
        document.getElementById(name).classList.add("invalid");
        document.getElementsByClassName(name)[0].classList.add("showDiv");
      }

      departmentCheck(name, value){
          if(value !== ""){
            document.getElementById(name).style.border="1px solid rgba(85,175,63,1)";
            this.setState({
                departmentCheck: true
            });
            return;
          }
      }

      emailCheck(name, value, stateChange){
          const {emailCheck, email, c_email} = this.state;
          var emailCopy = null;
        
          if(name === 'email'){
            let emailCheck = /[@]/;
            let emailValidation = emailCheck.test(value);

            if(emailValidation){
                this.showValid(name);
                this.setState({
                    emailCheck: true
                })
                return
            }
            this.setState({
                emailCheck: false,
            })
            this.showInvalid(name);
          }
      }
      checkAllValidations(){
          const { firstNameCheck, lastNameCheck, usernameCheck, passwordCheck, c_passwordCheck, emailCheck, departmentCheck} = this.state;
          if(firstNameCheck && lastNameCheck && usernameCheck && passwordCheck && c_passwordCheck && emailCheck && departmentCheck){
              return true;
          }
          return false;
      }


    render() {
        this.passwordEmailConfirm();
        const enableSubmit = this.checkAllValidations();
        const submitButton = enableSubmit ? <button onClick={()=>{showElement('user-info')}}className="waves-effect waves-light btn-large">Create</button> : <button className="btn-large disabled">Create</button>;
        const { inputChange, uploadChange } = this.props;
        const { firstname, lastname, username, password, email, c_password, firstNameCheck, lastNameCheck, usernameCheck, passwordCheck, emailCheck, departmentCheck} = this.state;

        return (
            <div className="container step-1-page">
            <Modal title="Please Confirm" id="user-info" message="Are you sure you want to add this user?"/>
                <h3 className="center">Please fill out form.</h3>
                <div className="divider"></div>
                <form className="col s12" action="">
                    <div className="row">
                        <div className="input-field col s6">
                            <input onChange={this.handleInputChange} name="firstname" value={firstname} id="firstname" type="text" className=""/>
                            <label for="firstName" className="active">First Name</label>
                            <div className="hidDiv firstname">Invalid Input. Field must contain at least one character</div>
                        </div>
                        <div className="input-field col s6">
                            <input onChange={this.handleInputChange} name="lastname" value={lastname} id="lastname" type="text" className=""/>
                            <label for="lastName" className="active">Last Name</label>
                            <div className="hidDiv lastname">Invalid Input. Field must contain at least one character</div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="input-field col s12">
                            <input onChange={this.handleInputChange} name="email" value={email} id="email" type="email" className=""/>
                            <label for="email" className="active">Email</label>
                            <div className="hidDiv email">Invalid Input. Field must contain '@'</div>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.handleInputChange} name="username" value={username} id="username" type="text" className=""/>
                            <label for="username" className="active">User Name</label>
                            <div className="hidDiv username">Invalid Input. User Name must contain at least one character</div>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.handleInputChange} name="password" value={password} id="password" type="password" className=""/>
                            <label for="password" className="active">Password</label>
                            <div className="hidDiv password">Invalid Password. Must contain at least 8 characters, 1 number, 1 uppercase characeter, and 1 special character</div>
                        </div>
                        <div className="input-field col s12">
                            <input onChange={this.handleInputChange} name="c_password" value={c_password} id="c_password" type="password" className=""/>
                            <label for="c_password" className="active">Confirm Password</label>
                            <div className="hidDiv c_password">Passwords do not match</div>
                            <div className="hidDiv c_passwordPass">Passwords Match</div>
                        </div>

                        <SelectDropDown id="department" name="department" submit={this.handleInputChange} selectTitle="Department" value={['Default', 'Clinical Development', 'Medical Affairs', 'Global Regulatory Affairs', 'Clinical Pharmacology']} selectClasses="col s3 sort-function-option" />
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