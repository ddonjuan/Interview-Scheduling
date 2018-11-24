import React, {Component} from 'react';
import StudentModal from './helpers/student-modal';
import { showElement } from './helpers/handle-input-helper';

import dummyData from './dummy-data';

class CandidateProgress extends Component{
    constructor(props){
        super(props);
        this.state = {
            candidate: [],
            firstInterview: [],
            secondInterview: [],
            acceptedCandidates: []
        }
        this.candidatesToScreen = this.candidatesToScreen.bind(this);
    }
    componentWillMount(){
        this.props.switchNav();
        this.props.hideDropDown();
    }
    candidatesToScreen(item, index){
        this.setState({
            candidate: item
        });
        showElement("candidates-to-screen");
    }
    sendCandidatesToFirstInterview(item, index){
        this.setState({
            firstInterview: item
        });
        showElement("first-interview");
    }
    sendCandidatesToSecondInterview(item, index){
        this.setState({
            secondInterview: item
        });
        showElement("second-interview");
    }
    acceptedCandidates(item, index){
        this.setState({
            acceptedCandidates: item
        });
        showElement("accepted-candidates");
    }
    //axio call 
    //make sure to send in the ID that will grab the candidate by ID and change the status

    render(){
        const {candidate, firstInterview, secondInterview, acceptedCandidates} = this.state;
        const {firstname, lastname, essay1, essay2, school, department} = candidate;
        const candidates = dummyData.map((item, index)=>{
            const {firstname, lastname, id} = item;
            return(
                <button data={item} onClick={()=>{this.candidatesToScreen(item)}} className="waves-effect waves-light orange btn candidate-button-progress">{`${firstname} ${lastname}`}</button>
            )
        })
        const candidatesRound1 = dummyData.map((item, index)=>{
            const {firstname, lastname, id} = item;
            return(
                <button data={item} onClick={()=>{this.sendCandidatesToFirstInterview(item)}} className="waves-effect waves-light blue btn candidate-button-progress">{`${firstname} ${lastname}`}</button>
            )
        })
        const candidatesRound2 = dummyData.map((item, index)=>{
            const {firstname, lastname, id} = item;
            return(
                <button data={item} onClick={()=>{this.sendCandidatesToSecondInterview(item)}} className="waves-effect waves-light blue btn candidate-button-progress">{`${firstname} ${lastname}`}</button>
            )
        })
        const acceptedCandidatesFinal = dummyData.map((item, index)=>{
            const {firstname, lastname, id} = item;
            return(
                <button data={item} onClick={()=>{this.acceptedCandidates(item)}} className="waves-effect waves-light green btn candidate-button-progress">{`${firstname} ${lastname}`}</button>
            )
        })
        return(
            <div className="container swimming-lanes">
            <StudentModal id="candidates-to-screen" title={"Are you sure you want to send this candidate to the First Interview?"} name={`${firstname} ${lastname}`} department={department} school={school}/>
            <StudentModal id="first-interview" title={"Are you sure you want to send this candidate to the Second Interview?"} name={`${firstInterview.firstname} ${firstInterview.lastname}`} department={firstInterview.department} school={firstInterview.school}/>
            <StudentModal id="second-interview" title={"Do you want to hire this candidates?"} name={`${secondInterview.firstname} ${secondInterview.lastname}`} department={secondInterview.department} school={secondInterview.school}/>
            <StudentModal id="accepted-candidates" title={"Hired"} name={`${acceptedCandidates.firstname} ${acceptedCandidates.lastname}`} department={acceptedCandidates.department} school={acceptedCandidates.school}/>
                <div className="row">
                    <div className="col s12 lanes-title">
                        <div className="col s3 lanes">Potential Employees <div className="divider"></div> </div>
                        <div className="col s3 lanes">Interview 1 <div className="divider"></div> </div>
                        <div className="col s3 lanes">Interview 2 <div className="divider"></div> </div>
                        <div className="col s3 lanes">Hired <div className="divider"></div> </div>
                    </div>
                    <div className="col s12 candidate-lanes">
                        <div className="col s3 lanes potential">{candidates}</div>
                        <div className="col s3 lanes potential">{candidatesRound1}</div>
                        <div className="col s3 lanes potential">{candidatesRound2}</div>
                        <div className="col s3 lanes potential">{acceptedCandidatesFinal}</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CandidateProgress;