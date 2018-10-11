import React, { Component } from 'react';

class InterviewerInfo extends Component {
    constructor(props) {
        super(props);
        this.triggerDropDown = this.triggerDropDown.bind(this);
    }
    triggerDropDown() {
        var dropDownList = document.getElementsByClassName("drop-down-list")[0];
        dropDownList.classList.toggle("visible");
        // if(window.onclick){
        //     dropDownList.classList.remove("visible");
        // }

    }
    render() {
        return (
            <div className="container">
                <div className="row in">
                    <div class="input-field col s6 in">
                        <input id="interviewer-first-name" type="text" className="validate" />
                        <label for="interviewer-first-name" className="active">First Name</label>
                    </div>
                </div>

                <div className="row in">
                    <div className="input-field col s6 in">
                        <input id="interviewer-last-name" type="email" className="validate" />
                        <label for="interviewer-last-name" className="active">Last Name</label>
                    </div>
                </div>
                <div className="row drop-down-container">
                    <div className="col s6 in">
                        <label>Function</label>
                        <select class="browser-default">
                            <option value="" disabled selected>Choose your department</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                        </select>
                    </div>
                    {/* <div className="col s6 in">
                        <h5>Function:</h5>
                        <input type="text" />
                        <button onClick={() => { this.triggerDropDown() }} className="waves-effect waves-light btn drop-down-button"><ion-icon name="arrow-dropdown-circle" className="icon-display"></ion-icon></button>
                    </div>
                    <ul className="drop-down-list">
                        <li>One</li>
                        <li class="divider" tabindex="-1"></li>
                        <li>Two</li>
                        <li class="divider" tabindex="-1"></li>
                        <li>Three</li>
                        <li class="divider" tabindex="-1"></li>
                        <li>Four</li>
                        <li class="divider" tabindex="-1"></li>
                        <li>Five</li>
                    </ul> */}
                </div>
                <button className="waves-effect waves-dark btn-large info-button">Save</button>
            </div>
        )
    }
}
export default InterviewerInfo;