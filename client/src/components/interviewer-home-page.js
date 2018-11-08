import React, { Component } from 'react';
import InterviewerHomeSortOptions from './interviewer-home-sort-options';
import InterviewerHomeInfoDisplay from './interviewer-home-info-display';
import DropdownNavList from './dropdown-navlist';
import axios from 'axios';
import dropdownNavlist from './dropdown-navlist';

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
            candidateInfo: [],
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
        this.searchBarToggle = this.searchBarToggle.bind(this);
        this.resetCandidateList = this.resetCandidateList.bind(this);
    }

    componentWillMount() {
        this.getStudentInfo();
        this.props.switchNav();
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

    // resetOriginalList(dropDownOption, flag1, flag2){
    //     if(dropDownOption && !flag1){
    //         flag2 = true;
    //     }

    //     if(dropDownOption === 'Default' && !flag1){
    //         flag2 = false;
    //         this.resetCandidateList();
    //     }
    // }

    // interestAndStatusOptions(sortObj, dropDownOption, flag){
    //     if (dropDownOption) {
    //         flag = true;
    //         if (dropDownOption === 'Default') {
    //             flag = false;
    //         }
    //     }

    //     if (flag) {
    //         var currentArray = sortObj.departmentArr;
    //         var statusSort = [];
    //         currentArray.map((item, index) => {
    //             if (item.status === dropDownOption) {
    //                 statusSort.push(item);
    //             }
    //         });
    //         sortObj.departmentArr = statusSort;
    //     }
    // }

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

    render() {
        const { elementsArr, department, alphabatize, status, toggleSearchBar, candidateInfo, search } = this.state;
        this.mainAlphabaticalSort(alphabatize);
        const drop = this.displayByDepartment(department, status);
        const showArr = drop.departmentArr;
        const showSearchBar = toggleSearchBar ? "showSearch" : "";
        const displayCandidates = showArr.map((item, index) => {
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
                    <DropdownNavList/>
                    <InterviewerHomeSortOptions  elementsArr={elementsArr} handleInputChange={this.handleInputChange} candidateInfo={displayCandidates} showSearchBar={showSearchBar} searchBarToggle={this.searchBarToggle} handleSelectDepartment={this.handleSelectDepartment} />
                    <InterviewerHomeInfoDisplay  resetCandidateList={this.resetCandidateList} displayCandidates={displayCandidates} candidateInfo={candidateInfo} />
                </div>
            </div>
        )
    }
}
export default InterviewerHomePage;