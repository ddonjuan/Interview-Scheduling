import React, {Component} from 'react';
import Modal from './helpers/modal';
import { showElement } from './helpers/handle-input-helper';

import dummyData from './dummy-data';

class CandidateProgress extends Component{
    constructor(props){
        super(props);
        this.state = {
            candidate: []
        }
        this.showCandidateButton = this.showCandidateButton.bind(this);
    }
    componentWillMount(){
        this.props.switchNav();
        this.props.hideDropDown();
    }
    showCandidateButton(item, index){
        this.setState({
            candidate: item
        });
        showElement("candidate-info");
    }

    render(){
        console.log("this is the state: ", this.state.candidate);
        const {candidate} = this.state;
        const {firstname, lastname, essay1, essay2, school, department} = candidate;
        const candidates = dummyData.map((item, index)=>{
            const {firstname, lastname, id} = item;
            return(
                <button data={item} onClick={()=>{this.showCandidateButton(item)}} className="waves-effect waves-light orange btn candidate-button-progress">{`${firstname} ${lastname}`}</button>
            )
        })
        return(
            <div className="container swimming-lanes">
            <Modal id="candidate-info" title={`${firstname} ${lastname}`}/>
                <div className="row">
                    <div className="col s12 lanes-title">
                        <div className="col s3 lanes">Potential Employees</div>
                        <div className="col s3 lanes">Interview 1</div>
                        <div className="col s3 lanes">Interview 2</div>
                        <div className="col s3 lanes">Hired</div>
                    </div>
                    <div className="col s12 candidate-lanes">
                        <div className="col s3 lanes potential">{candidates}</div>
                        <div className="col s3 lanes potential"></div>
                        <div className="col s3 lanes potential"></div>
                        <div className="col s3 lanes potential"></div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CandidateProgress;