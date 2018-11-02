import React, { Component } from 'react';
import InterviewerHomeSortOptions from './interviewer-home-sort-options';
import InterviewerHomeInfoDisplay from './interviewer-home-info-display';
import M from 'materialize';
import axios from 'axios';

class InterviewerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elementsArr: [],
            department: '',
            alphabatize: '',
            status: '',
            toggleSearchBar: false,
            candidateInfo:[]
        }
        this.handleSelectDepartment = this.handleSelectDepartment.bind(this);
        this.sortAlphabatically = this.sortAlphabatically.bind(this);
        this.searchBarToggle = this.searchBarToggle.bind(this);
        this.getStudentInfo = this.getStudentInfo.bind(this);
    }

    componentWillMount() {
        // this.defaultCandidateInfo();
        this.getStudentInfo();
    }

    async getStudentInfo(){
        try{
            await axios.get('http://localhost:8888/get-student-info.php').then(response=>{
                console.log("this is the response from axio call: ", response);
                this.setState({
                    elementsArr: response.data.data
                });
            });
        }
        catch(err){
            console.log("this is the error if never reach server: ", err);
        }
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
        console.log("THIS HI DISPLAY DEPARTMENT FUNCTION")
        const { elementsArr } = this.state;
        console.log("this is the department: ", department);
        console.log("this is the status: ", status);

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
        console.log("THIS IS THE status IN PARTAMTER: ", status);
        if(status){
            console.log("the status condiditon fired!!!@@")
            sortObj[0].isStatus = true;
            if(status === 'Default'){
                sortObj[0].isStatus = false;
            }
        }
        elementsArr.map((item, index)=>{
            if (item.interest === department) {
                console.log("this is the item in department: ", item)

                sortObj[0].departmentArr.push(item);
                sortObj[0].isValid = true;

                if(sortObj[0].isStatus){
                    console.log("this hit the status sort*@*@*@*@")
                    var currentArray = sortObj[0].departmentArr;
                    var statusSort = [];
                    currentArray.map((item, index)=>{
                        if(item.status === status){
                            statusSort.push(item);
                        }
                    });
                    sortObj[0].departmentArr = statusSort;
                }
            }
        });

        console.log("this is the object in the function: ", sortObj);
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
    displayCandidateInfo(item){
        console.log("CANDIATIATE FIRED!")
        this.setState({
            candidateInfo: item
        });
    }   
    toastFunction(){
        M.toast({html: 'I am a toast!'})
    }

    render() {
        this.toastFunction();
        const { elementsArr, department, alphabatize, status, toggleSearchBar, candidateInfo } = this.state;
        this.dropDownSortOptions(alphabatize);
        const drop = this.displayByDepartment(department, status);
        const showArr = drop[0].isValid ? drop[0].departmentArr : elementsArr; 
        const showSearchBar = toggleSearchBar ? "showSearch" : "";
        const displayCandidates = showArr.map((item, index) => {
            console.log("this is the item in the map in elements arr: ", item.firstname);
            const { firstname, lastname } = item;
            if(showArr){
                return (
                    <div onClick={()=>{this.displayCandidateInfo(item)}} className="names" id={item.id} index={index}>
                        <span>{firstname} {lastname}</span>
                    </div>
                )
            }
        });


        return (
            <div className="container home-container">
                <div className="row home-inner-container">
                    <InterviewerHomeSortOptions elementsArr = {elementsArr} showSearchBar={showSearchBar} searchBarToggle={this.searchBarToggle} handleSelectDepartment={this.handleSelectDepartment} />
                    <InterviewerHomeInfoDisplay elementsArr = {elementsArr} displayCandidates={displayCandidates} candidateInfo={candidateInfo}/>
                </div>
            </div>
        )
    }
}
export default InterviewerHomePage;