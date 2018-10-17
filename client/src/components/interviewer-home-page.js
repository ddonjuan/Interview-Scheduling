import React, { Component } from 'react';
import dummyData from './dummy-data';

class InterviewerHomePage extends Component {
    constructor(props) {
        super(props);
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
                            <select onChange={this.handleSelectOption} class="browser-default col s2 sort-name-option" ref="function">
                                <option value="" disabled selected>Alphabetize</option>
                                <option value="1">A-Z</option>
                                <option value="2">Z-A</option>
                            </select>
                            <select onChange={this.handleSelectOption} class="browser-default col s2 sort-function-option" ref="function">
                                <option value="" disabled selected>Function</option>
                                <option value="1">Option 1</option>
                                <option value="2">Python</option>
                                <option value="3">Drix</option>
                                <option value="4">Lease</option>
                                <option value="5">Strict</option>
                            </select>
                            <select onChange={this.handleSelectOption} class="browser-default col s2 sort-status-option" ref="function">
                                <option value="" disabled selected>Status</option>
                                <option value="1">Pending</option>
                                <option value="2">Accepted</option>
                                <option value="2">Rejected</option>
                            </select>
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
                                        <div className="col s3 pic"><img src={dummyData[0].img} alt=""/></div>
                                        <div className="col s1 name-school">
                                            <h6>Daniel Donjuan</h6>
                                            <h6>Cal State Fullerton</h6>
                                        </div>
                                        <div className="col s2 right status-display">Status</div>
                                    </div>
                                </div>
                                <div className="divider"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
export default InterviewerHomePage;