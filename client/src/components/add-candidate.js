import React, { Component } from 'react';
import SelectDropDown from './helpers/select-element';
import Modal from './helpers/modal';
import Input from './helpers/inputs';
import { showElement } from './helpers/handle-input-helper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/storage';

class AddCandidate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            school: '',
            yearOfGraduation: '',
            department: '',
            cv: null,
            firstNameCheck: false,
            lastNameCheck: false,
            phoneCheck: false,
            emailCheck: false,
            schoolCheck: false,
            yearOfGraduationCheck: false,
            departmentCheck: false,
            cvCheck: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleUploadChange = this.handleUploadChange.bind(this);
        // this.insertNewUser = this.insertNewUser.bind(this);

    }
    componentWillMount() {
        this.props.switchNav();
        this.props.hideDropDown();
    }
    handleUploadChange(event) {
        this.setState({
            'cv': event.target.files[0],
            cvCheck: true
        })
        document.getElementsByClassName('file-path')[0].classList.add("valid");
        document.getElementsByClassName('file')[0].classList.add("displayFileBlock");
    }
    handleInputChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        this.inputValidation(name, value);
    }

    inputValidation(name, value) {
        switch (name) {
            case 'firstname':
            case 'lastname':
            case 'school':
                this.nameInputCheck(name, value);
                break;
            case 'yearOfGraduation':
                this.graduationCheck(name, value);
                break;
            case 'email':
                this.emailCheck(name, value);
                break;
            case 'phone':
                this.phoneValidation(name, value);
                break;
            case 'department':
                this.departmentCheck(name, value);
                break;
            default:
                break;
        }
    }
    nameInputCheck(name, value) {
        if (value.length > 0) {
            switch (name) {
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
                case 'school':
                    this.setState({
                        schoolCheck: true
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
    phoneValidation(name, value) {
        var phoneNumTest = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        var regTest = phoneNumTest.test(value)
        if (regTest) {
            this.showValid(name);
            this.setState({
                phoneCheck: true
            });
            return
        }
        this.showInvalid(name);
        this.setState({
            phoneCheck: false
        });
    }

    showValid(name) {
        document.getElementById(name).classList.remove("invalid", "showDiv");
        document.getElementById(name).classList.add("valid");
        document.getElementsByClassName(name)[0].classList.remove("showDiv");
    }

    showInvalid(name) {
        document.getElementById(name).classList.remove("valid");
        document.getElementById(name).classList.add("invalid");
        document.getElementsByClassName(name)[0].classList.add("showDiv");
    }
    graduationCheck(name, value) {
        if (value) {
            this.setState({
                yearOfGraduationCheck: true
            });
            return;
        }
        this.setState({
            yearOfGraduation: false
        });
    }

    departmentCheck(name, value) {
        if (value !== "") {
            document.getElementById(name).style.border = "1px solid rgba(85,175,63,1)";
            this.setState({
                departmentCheck: true
            });
            return;
        }
    }

    emailCheck(name, value, stateChange) {
        const { emailCheck, email, c_email } = this.state;
        var emailCopy = null;

        if (name === 'email') {
            let emailCheck = /[@]/;
            let emailValidation = emailCheck.test(value);

            if (emailValidation) {
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
    checkAllValidations() {
        const { firstNameCheck, lastNameCheck, schoolCheck, yearOfGraduationCheck, emailCheck, departmentCheck, cvCheck } = this.state;
        if (firstNameCheck && lastNameCheck && schoolCheck && yearOfGraduationCheck && cvCheck && emailCheck && departmentCheck) {
            return true;
        }
        return false;
    }

    handleSubmit(){
        var firstName = this.state.firstname;
        var LastName = this.state.lastname;
        var ts = new Date().getTime();
        var config = {
            apiKey: 'AIzaSyAiaonRqttDyUYuezZshYwftS_nG6YFjPs',
            authDomain: 'interview-app-5def8.firebaseapp.com',
            databaseURL: 'https://interview-app-5def8.firebaseio.com/',
            storageBucket: 'gs://interview-app-5def8.appspot.com'
        };
        firebase.initializeApp(config);
        var storage = firebase.storage();
        var ref = storage.ref();
        var file = this.state.cv;
        var refName = ts + "." + firstName + "." + LastName + "." + file.name;
        var uploadTask = ref.child(refName).put(file).then(function (snapshot) {
            if (snapshot.state === "success") {
                ref.child(refName).getDownloadURL().then(function (url) {
                    var address = url;
                    this.createCandidate(address);
                }.bind(this)).catch(function (error) {
                    console.log("CV Not able to store", error);
                });
            } else {
                console.log("CV Not able to store");
            }
        }.bind(this));
    }

    async createCandidate(url){
        const { firstname, lastname, phone, email, school, yearOfGraduation, department } = this.state;
        const query = {
            firstname, 
            lastname, 
            phone, 
            email, 
            school, 
            yearOfGraduation, 
            department,
            'cv': url
        }
        try {
            await axios.post('http://localhost:8888/php/create-candidate.php', query).then(response => {
                console.log("this is the response from CREATE CANDIDATE: ", response);
                if(response.data.success){
                    console.log("Candidate ADDED");
                } else {
                    console.log("Failed at creating candidate", response.data.error);
                }
            });
        }
        catch (err) {
            console.log("this is the error if never reach server: ", err);
        }
    }

    render() {
        const { firstname, lastname, phone, email, school, yearOfGraduation, department, cv, cv_name } = this.state;
        const enableSubmit = this.checkAllValidations();
        const submitButton = enableSubmit ? <button onClick={() => this.handleSubmit() } className="waves-effect waves-light btn-large">Create</button> : <button className="btn-large disabled">Create</button>;
        console.log("this is the state: ", this.state);
        return (
            <div className="container step-1-page">
                <Modal submit={this.insertNewUser} title="Please Confirm" id="user-info" message="Are you sure you want to add this candidate?" />
                <h3 className="center">Complete Form to Add Candidate</h3>
                <div className="divider"></div>
                <form className="col s12" action="">

                    <div className="row">
                        <Input inputClassContainer="s6" handleInputChange={this.handleInputChange} value={firstname} name="firstname" type="text" labelTitle="First Name" errorMessage="Invalid Input. First name must contain at least one character" />
                        <Input inputClassContainer="s6" handleInputChange={this.handleInputChange} value={lastname} name="lastname" type="text" labelTitle="Last Name" errorMessage="Invalid Input. Last name must contain at least one character" />
                        <Input inputClassContainer="s6" handleInputChange={this.handleInputChange} value={phone} name="phone" type="text" labelTitle="Phone Number" errorMessage="Invalid Input. Field must contain a total of 10 digits including area code with the exception of '()' and '-'" />
                        <Input inputClassContainer="s6" handleInputChange={this.handleInputChange} value={email} name="email" type="email" labelTitle="Email" errorMessage="Invalid Input. Email must contain '@'" />
                        <Input inputClassContainer="s6" handleInputChange={this.handleInputChange} value={school} name="school" type="text" labelTitle="School" errorMessage="Invalid Input. School must contain at least one character" />
                        <Input inputClassContainer="s6" handleInputChange={this.handleInputChange} value={yearOfGraduation} name="yearOfGraduation" type="month" labelTitle="Year of Graduation" errorMessage="Invalid. Field must have a date" />
                        <SelectDropDown id="department" name="department" submit={this.handleInputChange} selectTitle="Department" value={['Default', 'Clinical Development', 'Medical Affairs', 'Global Regulatory Affairs', 'Clinical Pharmacology']} selectClasses="col s3 sort-function-option" />

                    </div>
                    <div className="row">
                        <div className="s3 file-field input-field">
                            <label for="btn" className="active">Upload CV/Resume</label>
                            <br />
                            <div className="btn" name="btn">
                                <span>File</span>
                                <input type="file" onChange={this.handleUploadChange} />
                            </div>
                            <div className="file-path-wrapper">
                                <input type="text" id="file-path" className="file-path" value={cv ? cv.name : ''} onChange={this.handleInputChange} placeholder="Select a file from your computer" />
                            </div>
                            <div className="hidDivBlock file">File Successfully Uploaded</div>

                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col s4 push-s5">
                        {submitButton}
                    </div>
                </div>
            </div>)
    }
}
export default AddCandidate;