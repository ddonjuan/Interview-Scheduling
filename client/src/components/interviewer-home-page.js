import React, { Component } from 'react';
import SelectDropDown from './helpers/select-element';
import dummyData from './dummy-data';

class InterviewerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementsArr: dummyData,
            department: '',
            alphabatize: '',
            status: '',
            toggleSearchBar: false
        }
        this.getNameInfo = this.getNameInfo.bind(this);
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
        this.sortAlphabatically = this.sortAlphabatically.bind(this);
        this.searchBarToggle = this.searchBarToggle.bind(this);
    }

    componentDidMount() {
        this.defaultCandidateInfo();
    }

    handleSelectDepartment(event) {
        const dropDownClicked = event.target;
        const dropDownId = dropDownClicked.id;
        switch (dropDownId) {
            case 'sort':
                this.setState({
                    alphabatize: event.target.value
                });
                break;
            case 'function-list':
                this.setState({
                    department: event.target.value
                });
                break;
            case 'status':
                this.setState({
                    status: event.target.value
                });
                break;
            default:
                //This is where the validation would go
                break;
        }

    }

    displayByDepartment(department, status) {
        const { elementsArr } = this.state;

        var sortObj = [
            {
                departmentArr: [],
                isValid: false,
                isStatus: false
            }
        ];

        sortObj[0].departmentArr = [];
        sortObj[0].isValid = false;
        sortObj[0].isStatus = false;

        if(status){
            sortObj[0].isStatus = true;
            if(status === 'Default'){
                sortObj[0].isStatus = false;
            }
        }
        Object.keys(elementsArr).forEach(key => {
            if (elementsArr[key].department === department) {

                sortObj[0].departmentArr.push(elementsArr[key]);
                sortObj[0].isValid = true;
                if(sortObj[0].isStatus){
                    var currentArray = sortObj[0].departmentArr;
                    var statusSort = [];
                    currentArray.map((item, index)=>{
                        if(item.interviewStatus === status){
                            statusSort.push(item);
                        }
                    });
                    sortObj[0].departmentArr = statusSort;
                }
            }
        });
        return sortObj;
    }
    sortAlphabatically(elementsArr) {
        elementsArr.sort((compare1, compare2) => {
            let lastName1 = compare1.lastName.toLowerCase();
            let lastName2 = compare2.lastName.toLowerCase()
            if (lastName1 < lastName2) {
                return -1;
            }
            if (lastName1 > lastName2) {
                return 1;
            }
            return 0;
        });
    }
    overallSortNames(sort) {
        const { elementsArr } = this.state;
        var sortArr = elementsArr;
        if(sort === "Default"){

            return;
        }
        if (sort === "A-Z") {
            this.sortAlphabatically(sortArr);
            return;
        }
        if (sort === "Z-A") {
            this.sortAlphabaticallyReverse(sortArr);
            return;
        }
    }
    sortAlphabaticallyReverse(elementsArr) {
        elementsArr.sort((compare1, compare2) => {
            let lastName1 = compare1.lastName.toLowerCase();
            let lastName2 = compare2.lastName.toLowerCase()
            if (lastName1 > lastName2) {
                return -1;
            }
            if (lastName1 < lastName2) {
                return 1;
            }
            return 0;
        });
    }
    dropDownSortOptions(sort) {
        if (sort) {
            this.overallSortNames(sort);
        }
    }
    namesBackgroundChange(event) {
        var namesElements = document.getElementsByClassName('names');
        var nameClicked = event.target;
        for (var i = 0; i < namesElements.length; i++) {
            namesElements[i].classList.remove('name-backgroundcolor');
        }
        nameClicked.classList.add('name-backgroundcolor');

    }
    statusColorChange(status, statusElement) {
        if (status === 'accepted') {
            statusElement.style.backgroundColor = "green";
            return
        }
        if (status === 'rejected') {
            statusElement.style.backgroundColor = "red";
            return
        }
        statusElement.style.backgroundColor = "orange";
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
        // namesBackground.classList.remove('name-backgroundcolor');
    }
    searchBarToggle(){
        const {toggleSearchBar} = this.state;
        if(toggleSearchBar){
            this.setState({
                toggleSearchBar: false
            });
            return;
        }
        this.setState({
            toggleSearchBar: true
        });
    }
    getNameInfo(item) {
        const { firstName, lastName, school, department, img, interviewStatus, essay1, essay2 } = item;
        let elementVar = [];
        // var imgElement = document.getElementsByClassName('pic-class')[0];
        var fullNameElement = document.getElementsByClassName('full-name')[0];
        var schoolNameElement = document.getElementsByClassName('school-name')[0];
        var statusELement = document.getElementsByClassName('status-name')[0];
        var statusColor = document.getElementsByClassName("dot-status")[0];
        var departmentElement = document.getElementsByClassName('function-name')[0];
        var essay1Element = document.getElementsByClassName('essay-1-set')[0];
        var essay2Element = document.getElementsByClassName('essay-2-set')[0];
        elementVar.push(fullNameElement, schoolNameElement, statusELement, essay1Element, essay2Element, departmentElement, statusColor);
        this.clearPreviousCandidateInfo(elementVar);

        this.statusColorChange(interviewStatus, statusColor);
        // imgElement.setAttribute('src', img);

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
        const { elementsArr, department, alphabatize, status, toggleSearchBar } = this.state;
        this.dropDownSortOptions(alphabatize);
        const drop = this.displayByDepartment(department, status);
        const showArr = drop[0].isValid ? drop[0].departmentArr : elementsArr; 
        const showSearchBar = toggleSearchBar ? "showSearch" : "";
        const candidates = showArr.map((item, index) => {
            const { firstName, lastName } = item;
            return (
                <div onClick={() => { this.getNameInfo(item); }} className="names" id={item.id}>
                    <span>{firstName} {lastName}</span>
                </div>
            )
        });


        return (
            <div className="container home-container">
                <div className="row home-inner-container">
                    <div className="section">
                        <div className="col s12 inner-header">
                            <SelectDropDown id="function-list" submit={this.handleSelectDepartment} selectTitle="Function" value={['Default', 'Chems', 'Test', 'Prep', 'Janitor']} selectClasses="col s2 sort-function-option" />
                            <SelectDropDown id="status" submit={this.handleSelectDepartment} selectTitle="Status" value={['Default', 'pending', 'accepted', 'rejected']} selectClasses="col s2 sort-status-option" />
                            <SelectDropDown id="sort" submit={this.handleSelectDepartment} selectTitle="Alphabatize" value={['Default', 'A-Z', 'Z-A']} selectClasses="col s2 sort-name-option" />
                            <i onClick={()=>{this.searchBarToggle()}} className="material-icons col small search-icon">search</i>
                            <input className={`input-field col s1 search-bar ${showSearchBar}`}/>
                            <div className="col s2 right count">
                                <h6>Count: {candidates.length}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="section">
                        <div className="col s12 home-info-container">
                            <div className="col s4 names-container">{candidates}</div>
                            <div className="col s8 info-container">
                                <div className="row info-header">
                                    <div className="col s12">
                                        {/* <div className="col s3 pic"><img className="pic-class" src="" alt="" /></div> */}
                                        <div className="col s4 name-school">
                                            <div className="full-name"></div>
                                            <div className="school-name"></div>
                                            <div className="function-name"></div>
                                        </div>
                                        <div className="col s3 right status-display">Status:
                                            <div className="dot-status"> </div><span className="status-name"></span>
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