import React, { Component } from 'react';
import SelectDropDown from './helpers/select-element';


class InterviewerHomeSortOptions extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const {showSearchBar, handleSelectDepartment, searchBarToggle, elementsArr, candidateInfo} = this.props;
        return (
            <div className="section">
                <div className="col s12 inner-header">
                    <SelectDropDown id="function-list" submit={handleSelectDepartment} selectTitle="Function" value={['Default', 'Clinical Development', 'Medical Affairs', 'Global Regulatory Affairs', 'Clinical Pharmacology']} selectClasses="col s3 sort-function-option" />
                    <SelectDropDown id="status" submit={handleSelectDepartment} selectTitle="Status" value={['Default', 'pending', 'accepted', 'rejected']} selectClasses="col s2 sort-status-option" />
                    <SelectDropDown id="sort" submit={handleSelectDepartment} selectTitle="Alphabatize" value={['Default', 'A-Z', 'Z-A']} selectClasses="col s2 sort-name-option" />
                    <i onClick={() => { searchBarToggle() }} className="material-icons col small search-icon">search</i>
                    <input className={`input-field col s1 search-bar ${showSearchBar}`} />
                    <div className="col s2 right count">
                        <h6>Count: {candidateInfo.length}</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default InterviewerHomeSortOptions;