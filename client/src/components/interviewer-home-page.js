import React, { Component } from 'react';
import SelectDropDown from './helpers/select-element';
import dummyData from './dummy-data';

class InterviewerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementsArr: []
        }
        this.getNameInfo = this.getNameInfo.bind(this);
    }

    componentDidMount() {
        this.defaultCandidateInfo();
    }
    statusColorChange(status, statusElement){
        if(status === 'accepted'){
            statusElement.style.backgroundColor = "green";
            return
        }
        if(status === 'rejected'){
            statusElement.style.backgroundColor="red";
            return
        }
        statusElement.style.backgroundColor="orange";
    }
    defaultCandidateInfo() {
        this.getNameInfo(dummyData[0]);
    }
    clearPreviousCandidateInfo(elementArr, namesBackground) {
        elementArr.map((item, index) => {
            if (!item.namesElements) {
                item.innerHTML = "";
            }
        });
        namesBackground.classList.remove('name-backgroundcolor');
    }

    getNameInfo(item) {
        const { firstName, lastName, school, department, img, interviewStatus, essay1, essay2 } = item;
        let elementVar = [];
        var imgElement = document.getElementsByClassName('pic-class')[0];
        var fullNameElement = document.getElementsByClassName('full-name')[0];
        var schoolNameElement = document.getElementsByClassName('school-name')[0];
        var statusELement = document.getElementsByClassName('status-name')[0];
        var statusColor = document.getElementsByClassName("dot-status")[0];
        var departmentElement = document.getElementsByClassName('function-name')[0];
        var essay1Element = document.getElementsByClassName('essay-1-set')[0];
        var essay2Element = document.getElementsByClassName('essay-2-set')[0];
        var namesElements = document.getElementsByClassName('names')[0];
        elementVar.push(imgElement, fullNameElement, schoolNameElement, statusELement, essay1Element, essay2Element, departmentElement, statusColor);
        this.clearPreviousCandidateInfo(elementVar, namesElements);
        this.setState({
            elementArr: elementVar
        });

        this.statusColorChange(interviewStatus, statusColor);

        namesElements.classList.add('name-backgroundcolor');

        imgElement.setAttribute('src', img);

        var fullName = document.createTextNode(`${firstName} ${lastName}`);
        fullNameElement.appendChild(fullName);

        var schoolName = document.createTextNode(`${school}`)
        schoolNameElement.appendChild(schoolName);

        var statusDisplay = document.createTextNode(`${interviewStatus}`);
        statusELement.appendChild(statusDisplay);

        var functionDisplay = document.createTextNode(`${department}`);
        departmentElement.appendChild(functionDisplay);

        var essay1Display = document.createTextNode(`${essay1}`);
        essay1Element.appendChild(essay1Display);

        var essay2Display = document.createTextNode(`${essay2}`);
        essay2Element.appendChild(essay2Display);
    }

    render() {
        
        console.log("this is the state: ", this.state);
        const candidates = dummyData.map((item, index) => {
            const { firstName, lastName } = item;
            return (
                <div onClick={() => { this.getNameInfo(item) }} className="names" id={item.id}>
                    <span>{firstName} {lastName}</span>
                </div>
            )
        });


        return (
            <div className="container home-container">
                <div className="row home-inner-container">
                    <div className="section">
                        <div className="col s12 inner-header">
                            <SelectDropDown id="sort" selectTitle="Alphabatize" value={['A-Z', 'Z-A']} selectClasses="col s2 sort-name-option" />
                            <SelectDropDown id="function-list" selectTitle="Function" value={['Chems', 'Test', 'Prep', 'Janitor']} selectClasses="col s2 sort-function-option" />
                            <SelectDropDown id="status" selectTitle="Status" value={['Pending', 'Accepted', 'Rejected']} selectClasses="col s2 sort-status-option" />
                            <div className="col s2 right count">
                                <h6>Count: {dummyData.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="col s12 home-info-container">
                            <div className="col s4 names-container">{candidates}</div>
                            <div className="col s8 info-container">
                                <div className="row info-header">
                                    <div className="col s12">
                                        <div className="col s3 pic"><img className="pic-class" src="" alt="" /></div>
                                        <div className="col s4 name-school">
                                            <div className="full-name"></div>
                                            <div className="school-name"></div>
                                            <div className="function-name"></div>
                                        </div>
                                        <div className="col s3 right status-display">Status:    
                                            <div class="dot-status"> </div><span className="status-name"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                <div className="row essay">
                                    <span>Essay 1: </span><p className="essay-1-set"></p>
                                </div>
                                <div className="row essay">
                                    <span>Essay 2: </span><p className="essay-2-set"></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default InterviewerHomePage;