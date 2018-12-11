import React, {Component} from 'react';
import { showElement } from './helpers/handle-input-helper';
import NameOptions from './helpers/progress-name-options';
import axios from 'axios';

import dummyData from './dummy-data';

class CandidateProgress extends Component{
    constructor(props){
        super(props);
        this.state = {
            candidate: [],
            firstInterview: [],
            secondInterview: [],
            acceptedCandidates: [],
        }
        this.candidatesToScreen = this.candidatesToScreen.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.getPoolInfo = this.getPoolInfo.bind(this);
    }
    componentWillMount(){
        this.props.switchNav();
        this.props.hideDropDown();
        this.getPoolInfo();
    }

    async getPoolInfo() {
        try {
            await axios.get('http://localhost:8888/php/get-swimming-lane.php').then(response => {
                console.log("this is the response from axio call: ", response);
                this.setState({
                    candidate: response.data.data[1],
                    firstInterview: response.data.data[2],
                    secondInterview: response.data.data[3],
                    acceptedCandidates: response.data.data[4]
                });
            });
        }
        catch (err) {
            console.log("this is the error if never reach server: ", err);
        }
    }
    grabLastNameInitial(name){
        var lastNameInitial = name.substring(1,0);
        return lastNameInitial+'.';
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
                    this.getPoolInfo();
                } else {
                    console.log("Failed at updating data", response.data.error);
                }
            });
        }
        catch (err) {
            console.log("this is the error if never reach server: ", err);
        }
    }
    //axio call 
    //make sure to send in the ID that will grab the candidate by ID and change the status

    render(){
        const {candidate, firstInterview, secondInterview, acceptedCandidates} = this.state;
        console.log("THIS IS THE CANDIDATE: ", candidate);

        var candidates;
        if(this.state.candidate){
            candidates = this.state.candidate.map((item, index)=>{
                console.log("this is the item: ", item);
                const {firstname, lastname, id, status} = item;
                const lastnameInitial = this.grabLastNameInitial(lastname);
                return(
                  <NameOptions candidateInfo={item} id="newID" hideArrow="hide-arrow" addClass="waves-effect waves-light orange btn candidate-button-progress" addInfoClass="waves-effect orange lighten-1 align-first" showRight={true} showLeft={true} fullName={`${firstname} ${lastnameInitial}`} leftArrow="" rightArrow="navigate_next" getPoolInfo={this.getPoolInfo} updateStatus={this.updateStatus} studentId={id} status={status}/>
                )
            })
        }

        var candidatesRound1;
        if(this.state.firstInterview){
            candidatesRound1 = this.state.firstInterview.map((item, index)=>{
                const {firstname, lastname, id, status} = item;
                const lastnameInitial = this.grabLastNameInitial(lastname);
                return(
                  <NameOptions addClass="waves-effect waves-light blue btn candidate-button-progress interview1Button" addInfoClass="waves-effect blue lighten-1 interview1Info" showRight={true} showLeft={true} fullName={`${firstname} ${lastnameInitial}`} rightArrow="navigate_next" leftArrow="navigate_before" getPoolInfo={this.getPoolInfo} updateStatus={this.updateStatus} studentId={id} status={status}/>
                )
            })
        }

        var candidatesRound2;
        if(this.state.secondInterview){
            candidatesRound2 = this.state.secondInterview.map((item, index)=>{
                const {firstname, lastname, id, status} = item;
                const lastnameInitial = this.grabLastNameInitial(lastname);
                return(
                  <NameOptions addClass="waves-effect waves-light blue btn candidate-button-progress interview1Button" addInfoClass="waves-effect blue lighten-1 interview1Info" showRight={true} showLeft={true} fullName={`${firstname} ${lastnameInitial}`} rightArrow="navigate_next" leftArrow="navigate_before" getPoolInfo={this.getPoolInfo} updateStatus={this.updateStatus} studentId={id} status={status}/>
                )
            })
        }

        var acceptedCandidatesFinal;
        if(this.state.acceptedCandidates){
            acceptedCandidatesFinal = this.state.acceptedCandidates.map((item, index)=>{
                const {firstname, lastname, id, status} = item;
                const lastnameInitial = this.grabLastNameInitial(lastname);
                return(
                  <NameOptions hideArrow="hide-arrow" addClass="waves-effect waves-light green btn candidate-button-progress" addInfoClass="waves-effect green lighten-1 hiredInfo" showLeft={true} showRight={true} fullName={`${firstname} ${lastnameInitial}`} rightArrow="" leftArrow="navigate_before" getPoolInfo={this.getPoolInfo} updateStatus={this.updateStatus} studentId={id} status={status}/>
                )
            })
        }

        return(
            <div className="swimming-lanes">
            {/* <StudentModal id="candidates-to-screen" title={"Are you sure you want to send this candidate to the First Interview?"} name={`${firstname} ${lastname}`} department={department} school={school}/>
            <StudentModal id="first-interview" title={"Are you sure you want to send this candidate to the Second Interview?"} name={`${firstInterview.firstname} ${firstInterview.lastname}`} department={firstInterview.department} school={firstInterview.school}/>
            <StudentModal id="second-interview" title={"Do you want to hire this candidates?"} name={`${secondInterview.firstname} ${secondInterview.lastname}`} department={secondInterview.department} school={secondInterview.school}/>
            <StudentModal id="accepted-candidates" title={"Hired"} name={`${acceptedCandidates.firstname} ${acceptedCandidates.lastname}`} department={acceptedCandidates.department} school={acceptedCandidates.school}/> */}
                {/* <div className="row"> */}
                    <div className="lanes-title">
                        <div className="lanes">Potential Employees <div className="divider"></div> </div>
                        <div className="lanes">Interview 1 <div className="divider"></div> </div>
                        <div className="lanes">Interview 2 <div className="divider"></div> </div>
                        <div className="lanes">Hired <div className="divider"></div> </div>
                    </div>
                    <div className="candidate-lanes">
                        <div className="lanes potential">{candidates}</div>
                        <div className="lanes potential">{candidatesRound1}</div>
                        <div className="lanes potential">{candidatesRound2}</div>
                        <div className="clanes potential">{acceptedCandidatesFinal}</div>
                    </div>
                {/* </div> */}
            </div>
        )
    }
}
export default CandidateProgress;