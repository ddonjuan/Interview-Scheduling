import React from 'react';
import {showElement} from '../helpers/handle-input-helper';
import StudentModal from './student-modal';



export default (props) => {

    const {showLeft, showRight, updateStatus, studentId, status, candidateInfo} = props;
    console.log("this is the candidateInfo: ", candidateInfo);
    const showLeftElem = showLeft ? <i className={`medium material-icons hide-icons ${props.hideArrow}`} onClick={() => updateStatus(studentId, status, -1)}>{props.leftArrow}</i> : "";
    const showRightElem = showRight ? <i className={`tiny material-icons hide-icons ${props.hideArrow}`} onClick={() => updateStatus(studentId, status, 1)}>{props.rightArrow}</i> : "";

    return(
        <div className="name-options-container">
            <StudentModal title="Student Modal"  department="poop" school="RTP" id="newID" />
            <div className="button-arrows">
                {showLeftElem}
                <button className={props.addClass}>{props.fullName}</button>
                {showRightElem}
            </div>
            <div onClick={()=>{showElement(`${props.id}`)}} className={`${props.addInfoClass} name-info-option`}>Info</div>
        </div>
    )
}