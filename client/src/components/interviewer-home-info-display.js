import React, { Component } from 'react';
import M from 'materialize-css';


class InterviewerHomeInfoDisplay extends Component {
    constructor(props) {
        super(props);
    }
    toastFunction(){
        M.toast({html: 'There are no candidates to display'})
    }

    render() {
        const { displayCandidates, candidateInfo, resetCandidateList } = this.props;
        // console.log("this is the caniddate info in the home info display $*$*$*$*: ", showArr);
        const {firstname, lastname, status, school, essay1, essay2, interest} = candidateInfo;
        const errorCandidates = displayCandidates.length === 0 ? <div onClick={this.toastFunction()} className="no-candidates"> <div>There are no candidates to display</div><button onClick={()=>{resetCandidateList()}} className="waves-effect waves-light blue btn-large">Reset Candidates List</button> </div> : displayCandidates

        return (
            <div className="section">
                <div className="col s12 home-info-container">
                    <div className="col s4 names-container">{errorCandidates}</div>
                    <div className="col s8 info-container">
                        <div className="row info-header">
                            <div className="col s12">
                                <div className="col s3 pic"><img className="pic-class" src="" alt="" /></div>
                                <div className="col s4 name-school">
                                    <div className="full-name">{`${firstname} ${lastname}`}</div>
                                    <div className="school-name">{school}</div>
                                    <div className="function-name">{interest}</div>
                                </div>
                                <div className="col s3 right status-display">Status:
                                <div className="dot-status"> </div><span className="status-name">{status}</span>
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