import React, { Component } from 'react';
import axios from 'axios';
// import M from 'materialize-css';


class InterviewerHomeInfoDisplay extends Component {
    constructor(props) {
        super(props);

        this.state={

        }
    }

    async updateStatus(studentId, currentStatus, statusAction){
        var query = {
            'id' : studentId,
            'current-status' : currentStatus,
            'status-action' : statusAction
        }
        try {
            await axios.post('http://localhost:8888/php/update-status.php', query).then(response => {
                console.log("this is the response from update status: ", response);
                if(response.data.success){
                    console.log("SENT TO PROGRESS PAGE");
                    //add status change
                } else {
                    console.log("Failed at updating data", response.data.error);
                }
            });
        }
        catch (err) {
            console.log("this is the error if never reach server: ", err);
        }
    }

    render() {
        const { displayCandidates,resetCandidateList, candidateInfo} = this.props;
        const {firstname, lastname, status, id, essay1, essay2, school, interest} = candidateInfo;
        const errorCandidates = displayCandidates.length === 0 ? <div className="no-candidates"> <div>There are no candidates to display</div><button onClick={()=>{resetCandidateList()}} className="waves-effect waves-light blue btn-large">Reset Candidates List</button> </div> : displayCandidates;
        const interviewButton = status < 1 ? <button id={id} key={id} onClick={() => this.updateStatus(id, status, 1)} className="waves-effect waves-light blue btn-large interview-button">Interview</button> : <button id={id} key={id} className="disabled btn-large interview-button">In Progress</button> ;
        // if(id !== undefined){
        //     document.getElementsByClassName("interview-button")[0].setAttribute("id", id);   

        // }
        return (
            <div className="section">
                <div className="col s12 home-info-container">
                    <div className="col s4 names-container">{errorCandidates}</div>
                    <div className="col s8 info-container">
                        <div className="row info-header">
                            <div className="col s12">
                                {/* <div className="col s3 pic"><img className="pic-class" src="" alt="" /></div> */}
                                <div className="col s4 name-school">
                                    <div className="full-name">{`${firstname} ${lastname}`}</div>
                                    <div className="school-name">{school}</div>
                                    <div className="function-name">{interest}</div>
                                </div>
                                <div className="col s3 right status-display">
                                    {interviewButton}
                                    {/* <button id={id} key={id} onClick={() => this.updateStatus(id, status, 1)} className="waves-effect waves-light blue btn-large interview-button">Interview</button> */}
                                {/* <div className="dot-status"> </div><span className="status-name">{status}</span> */}
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="row essay">
                            <span>Essay 1: </span><p className="essay-1-set">{essay1}</p>
                        </div>
                        <div className="row essay">
                            <span>Essay 2: </span><p className="essay-2-set">{essay2}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default InterviewerHomeInfoDisplay;