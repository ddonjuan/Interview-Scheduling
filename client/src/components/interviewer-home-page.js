import React, { Component } from 'react';
import InterviewerHomeSortOptions from './interviewer-home-sort-options';
import InterviewerHomeInfoDisplay from './interviewer-home-info-display';
import DropdownNavList from './dropdown-navlist';
import axios from 'axios';

class InterviewerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementsArr: [],
            search: '',
            department: 'Default',
            alphabatize: '',
            status: 'Default',
            toggleSearchBar: false,
            isSearch: false,
            candidateInfo: [],
            candidatesDisplayed: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
        this.searchBarToggle = this.searchBarToggle.bind(this);
        this.resetCandidateList = this.resetCandidateList.bind(this);
        this.defaultCandidateDisplay = this.defaultCandidateDisplay.bind(this);
    }

    componentWillMount() {
        this.getStudentInfo();
        this.props.switchNav();
        this.props.hideDropDown();
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
        var sortObj = {
                departmentArr: [],
                isValid: false,
                isStatus: false,
                isDepartment: false,
                isSearch: false,
                departmentFirst: false,
                statusFirst: false
        };
        var firstArr = [];
        var secondArr = [];
 
        if(department !== "Default"){
            elementsArr.map((item, index) => {
                if (item.interest === department) {
                    firstArr.push(item);
                }
            });
        } else {
            firstArr = elementsArr;
        }
        if(status !== "Default"){
            firstArr.map((item, index) =>{
                if(item.status === status){
                    secondArr.push(item);
                }
            });
        }else {
            secondArr = firstArr;
        }
        sortObj.departmentArr = secondArr;
        return sortObj;
    }

    mainAlphabaticalSort(sort) {
        const { elementsArr } = this.state;
        var sortArr = elementsArr;
        switch(sort){
            case 'Default':
                break;
            case 'A-Z':
            case 'Z-A':
                this.sortAlphabaticallyOrReverse(sortArr, sort);
                break;
            default:
                break;
        }
    }
    
    sortAlphabaticallyOrReverse(elementsArr, sort) {
        elementsArr.sort((compare1, compare2) => {
            let lastName1 = compare1.lastname.toLowerCase();
            let lastName2 = compare2.lastname.toLowerCase()
            if(sort === 'A-Z'){
                if (lastName1 < lastName2) {
                    return -1;
                }
                if (lastName1 > lastName2) {
                    return 1;
                }
            }
            if(sort  === 'Z-A'){
                if (lastName1 > lastName2) {
                    return -1;
                }
                if (lastName1 < lastName2) {
                    return 1;
                }
            }

            return 0;
        });
    }

    searchBarToggle() {
        const { toggleSearchBar } = this.state;
        if (toggleSearchBar) {
            this.setState({
                toggleSearchBar: false,
                isSearch: false
            });
            document.getElementsByClassName("search-bar")[0].value = "";
            return;
        }
        this.setState({
            toggleSearchBar: true,
            isSearch: true
        });
    }
    displayCandidateInfo(item, index) {
        this.setState({
            candidateInfo: item
        });
  
    }


    search(candidateList){
        const {toggleSearchBar, search} = this.state;
        var searchLowerCase = '';
        var searchLowerCaseArr = [];
        searchLowerCase += search.toLowerCase();
        if(toggleSearchBar && search !== ''){
            var searchArr = [];
            candidateList.map((item, index)=>{
                searchLowerCaseArr.push(`${item.firstname.toLowerCase()} ${item.lastname.toLowerCase()}`, index);
                if(item.firstname.indexOf(searchLowerCase) > -1){
                    searchArr.push(item);
                }
            });
            console.log("this is the searchLowerCase: ", searchLowerCaseArr)
            return searchArr;
        }
        return false;
    }
    candidatesDisplaying(candidatesArr){
        if(candidatesArr.length === 0){
            return false;
        }
        return true;
    }
    defaultCandidateDisplay(candidate, index){
        if(index === 0){
            const {firstname, lastname, school, status, essay1, essay2, interest} = candidate;
            document.getElementsByClassName("full-name")[0].innerHTML = `${firstname} ${lastname}`;
            document.getElementsByClassName("school-name")[0].innerHTML = school;
            document.getElementsByClassName("function-name")[0].innerHTML = interest;
            document.getElementsByClassName("status-name")[0].innerHTML = status;
            document.getElementsByClassName("essay-1-set")[0].innerHTML = essay1;
            document.getElementsByClassName("essay-2-set")[0].innerHTML = essay2;
        return;
        }
        return;
    }

    resetCandidateList() {
        this.setState({
            department: 'Default',
            status: 'Default',
            search: '',
            toggleSearchBar: false
        });
        var status = document.getElementById('status');
        var department = document.getElementById('function-list');
        status.value = "Default";
        department.value = "Default";
    }

    render() {
        const { elementsArr, department, alphabatize, status, toggleSearchBar, candidateInfo, search } = this.state;
        this.mainAlphabaticalSort(alphabatize);
        const drop = this.displayByDepartment(department, status);
        const showArr = drop.departmentArr;
        const searchCandidates = this.search(showArr);
        const finalDisplay = searchCandidates ? searchCandidates : showArr;
        const showSearchBar = toggleSearchBar ? "showSearch" : "";
        const displayCandidates = finalDisplay.map((item, index, arr) => {
            this.defaultCandidateDisplay(item, index);
            const { firstname, lastname } = item;
                return (
                    <div onClick={() => { this.displayCandidateInfo(item, index) }} className="names" id={item.id} key={index}>
                        <span>{firstname} {lastname}</span>
                    </div>
                )
            
        });

        return (
            <div className="container home-container">
                <div className="row home-inner-container">
                    {/* <DropdownNavList/> */}
                    <InterviewerHomeSortOptions  elementsArr={elementsArr} handleInputChange={this.handleInputChange} candidateInfo={displayCandidates} showSearchBar={showSearchBar} searchBarToggle={this.searchBarToggle} handleSelectDepartment={this.handleSelectDepartment} />
                    <InterviewerHomeInfoDisplay  resetCandidateList={this.resetCandidateList} displayCandidates={displayCandidates} candidateInfo={candidateInfo} />
                </div>
            </div>
        )
    }
}
export default InterviewerHomePage;