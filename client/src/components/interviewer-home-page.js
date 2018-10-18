import React, { Component } from 'react';
import SelectDropDown from './helpers/select-element';
import dummyData from './dummy-data';

class InterviewerHomePage extends Component {
    constructor(props) {
        super(props);
    }
    getFunctions(){
    }
    render() {
        const candidates = dummyData.map((item, index)=>{
            const {firstName, lastName} = item;
            return (
                <div className="names" id={item.id}>
                    <span>{firstName} {lastName}</span>
                </div>
            )
        });
        return (
            <div className="container home-container">
                <div className="row home-inner-container">
                    <div className="section">
                        <div className="col s12 inner-header">
                            <SelectDropDown id="sort" selectTitle="Alphabatize" value={['A-Z', 'Z-A']} selectClasses="col s2 sort-name-option"/>
                            <SelectDropDown id="function-list" selectTitle="Function" value={['Chems', 'Test', 'Prep', 'Janitor']} selectClasses="col s2 sort-function-option"/>
                            <SelectDropDown id="status" selectTitle="Status" value={['Pending', 'Accepted', 'Rejected']} selectClasses="col s2 sort-status-option"/>
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
                                        <div className="col s3 pic"><img className="pic-class"src={dummyData[0].img} alt=""/></div>
                                        <div className="col s1 name-school">
                                            <span>Daniel Donjuan</span>
                                            <span>Cal State Fullerton</span>
                                        </div>
                                        <div className="col s2 right status-display">Status</div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                                div.essay-container
                                <div className="row essay">
                                    <span>Essay 1: </span><p>{dummyData[0].essay1}</p>
                                </div>
                                <div className="row essay">
                                    <span>Essay 2: </span><p>{dummyData[0].essay1}</p>
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