import React, { Component } from 'react';
import { showElement, redirectLogin } from './helpers/handle-input-helper';
import Modal from './helpers/modal';


class InterviewerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            department: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectOption = this.handleSelectOption.bind(this);
        this.doesThisWork = this.doesThisWork.bind(this);
    }
    handleInputChange(event) {
        const { value, name } = event.target;
        this.setState({
            [name]: value,
        });

    }
    handleSelectOption(event) {
        console.log("event: ", event);
        this.setState({
            department: event.target.value
        })
    }
    doesThisWork(){
        console.log("It works!");
        this.props.history.push("/interviewer-login");
    }
    render() {
        console.log("this should be the history: ", this.props);
        const {firstName, lastName, department} = this.state;
            
        return (
            <div className="container">
                <Modal id="1" title="Is this information correct?" firstName={firstName} lastName={lastName} function={department} submit={this.doesThisWork}/>
                <h4 className="center">Enter Information</h4>
                <div className="row in">
                    <div class="input-field col s6 in">
                        <input onChange={this.handleInputChange} name="firstName" id="interviewer-first-name" type="text" className="validate" />
                        <label for="interviewer-first-name" className="active">First Name</label>
                    </div>
                </div>

                <div className="row in">
                    <div className="input-field col s6 in">
                        <input onChange={this.handleInputChange} name="lastName" id="interviewer-last-name" type="text" className="validate" />
                        <label for="interviewer-last-name" className="active">Last Name</label>
                    </div>
                </div>
                <div className="row drop-down-container">
                    <div className="col s6 in">
                        <label>Function</label>
                        <select onChange={this.handleSelectOption} class="browser-default" ref="function">
                            <option value="" disabled selected>Choose your department</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                    </div>
                </div>
                <button onClick={() => showElement("1")} className="waves-effect waves-dark btn-large modal-trigger info-button">Save</button>
            </div>
        )
    }
}
export default InterviewerInfo;