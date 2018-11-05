import React, { Component } from 'react';
import InterviewerHomeSortOptions from './interviewer-home-sort-options';
import InterviewerHomeInfoDisplay from './interviewer-home-info-display';
import axios from 'axios';

class InterviewerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementsArr: [],
            search: '',
            department: '',
            alphabatize: '',
            status: '',
            toggleSearchBar: false,
            candidateInfo: [],
            anotherArr: []
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
        this.sortAlphabatically = this.sortAlphabatically.bind(this);
        this.searchBarToggle = this.searchBarToggle.bind(this);
        this.getStudentInfo = this.getStudentInfo.bind(this);
        this.resetCandidateList = this.resetCandidateList.bind(this);
    }

    defaultInfoDisplay(currentCandidateArr){
        
    }
    componentWillMount() {
        // this.defaultCandidateInfo();
        this.getStudentInfo();
    }

    async getStudentInfo() {
        try {
            await axios.get('http://localhost:8888/get-student-info.php').then(response => {
                console.log("this is the response from axio call: ", response);
                this.setState({
                    elementsArr: response.data.data
                });
            });
        }
        catch (err) {
            console.log("this is the error if never reach server: ", err);
        }
    }
    handleInputChange(event) {
        const { value } = event.target;
        this.setState({
            search: value,
        });
    }
    displayCandidateSearch(arrayToSearch, container) {
        const { search } = this.state;
        arrayToSearch.map((item, index) => {
            if (search === arrayToSearch.firstname || search === arrayToSearch.lastname) {
                container.push(item);
            }
        })
        return container;

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

    displayByDepartment(department, status, search) {
        const { elementsArr } = this.state;
        var sortObj = [
            {
                departmentArr: [],
                isValid: false,
                isStatus: false,
                isDepartment: false,
                isSearch: false
            }
        ];

        sortObj[0].departmentArr = [];
        sortObj[0].isValid = false;
        sortObj[0].isStatus = false;
        sortObj[0].isDepartment =  false;
        sortObj[0].isSearch = false;

        if(search){
            sortObj[0].isSearch = true;
        }

        if (status) {
            sortObj[0].isStatus = true;
            if (status === 'Default') {
                sortObj[0].isStatus = false;
            }
        }
        elementsArr.map((item, index) => {
            if (item.interest === department) {
                sortObj[0].departmentArr.push(item);
                sortObj[0].isValid = true;

                if (sortObj[0].isStatus) {
                    var currentArray = sortObj[0].departmentArr;
                    var statusSort = [];
                    currentArray.map((item, index) => {
                        if (item.status === status) {
                            statusSort.push(item);
                        }
                    });
                    sortObj[0].departmentArr = statusSort;
                }
                if(sortObj[0].isSearch){
                    var searchArr = [];
                    sortObj[0].departmentArr.map((item, index)=>{
                        if(item.firstname === search || item.lastname === search){
                            searchArr.push(item);
                        }
                    })
                    sortObj[0].departmentArr = searchArr;
                }
            }
        });

        return sortObj;
    }
    sortAlphabatically(elementsArr) {
        elementsArr.sort((compare1, compare2) => {
            let lastName1 = compare1.lastname.toLowerCase();
            let lastName2 = compare2.lastname.toLowerCase()
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
        if (sort === "Default") {

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
            let lastName1 = compare1.lastname.toLowerCase();
            let lastName2 = compare2.lastname.toLowerCase()
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
    // namesBackgroundChange(event) {
    //     var namesElements = document.getElementsByClassName('names');
    //     var nameClicked = event.target;
    //     for (var i = 0; i < namesElements.length; i++) {
    //         namesElements[i].classList.remove('name-backgroundcolor');
    //     }
    //     nameClicked.classList.add('name-backgroundcolor');

    // }
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
    // defaultCandidateInfo() {
    //     this.getNameInfo(dummyData[0]);
    // }
    clearPreviousCandidateInfo(elementArr, namesBackground) {
        elementArr.map((item, index) => {
            if (!item.namesElements) {
                item.innerHTML = "";
            }
        });
        // namesBackground.classList.remove('name-backgroundcolor');
    }
    searchBarToggle() {
        const { toggleSearchBar } = this.state;
        if (toggleSearchBar) {
            this.setState({
                toggleSearchBar: false
            });
            return;
        }
        this.setState({
            toggleSearchBar: true
        });
    }
    displayCandidateInfo(item, index) {
        this.setState({
            candidateInfo: item
        });
  
    }

    resetCandidateList() {
        this.setState({
            department: 'Default',
            status: 'Default'
        });
        var status = document.getElementById('status');
        var department = document.getElementById('function-list');
        status.value = "Default";
        department.value = "Default";
    }
    defaultCandidateDisplay(arr){
        console.log("this is the show ARR IN THE FIRUNCTION: ", arr);
        // const {firstname, lastname, school, status, essay1, essay2, interest} = arr;
        // document.getElementsByClassName("full-name")[0].innerHTML = arr;
    }

    render() {
        const { elementsArr, department, alphabatize, status, toggleSearchBar, candidateInfo, search } = this.state;
        this.dropDownSortOptions(alphabatize);
        const drop = this.displayByDepartment(department, status, search);
        const showArr = drop[0].isValid ? drop[0].departmentArr : elementsArr;
        const showSearchBar = toggleSearchBar ? "showSearch" : "";
        const displayCandidates = showArr.map((item, index) => {
            const { firstname, lastname } = item;
            if (showArr) {
                return (
                    <div onClick={() => { this.displayCandidateInfo(item, index) }} className="names" id={item.id} index={index}>
                        <span>{firstname} {lastname}</span>
                    </div>
                )
            }
        });

        return (
            <div className="container home-container">
                <div className="row home-inner-container">
                    <InterviewerHomeSortOptions showArr={showArr} elementsArr={elementsArr} handleInputChange={this.handleInputChange} candidateInfo={displayCandidates} showSearchBar={showSearchBar} searchBarToggle={this.searchBarToggle} handleSelectDepartment={this.handleSelectDepartment} />
                    <InterviewerHomeInfoDisplay elementsArr={elementsArr} resetCandidateList={this.resetCandidateList} displayCandidates={displayCandidates} candidateInfo={candidateInfo} />
                </div>
            </div>
        )
    }
}
export default InterviewerHomePage;