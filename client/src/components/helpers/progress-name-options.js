import React from 'react';
import {showElement} from '../helpers/handle-input-helper';
import StudentModal from '../helpers/student-modal';



export default (props) => {

    const {showLeft, showRight, updateStatus, studentId, status, candidateInfo, itemDisplay, showCan} = props;
    const showLeftElem = showLeft ? <i className={`medium material-icons hide-icons ${props.hideArrow}`} onClick={() => updateStatus(studentId, status, -1)}>{props.leftArrow}</i> : "";
    const showRightElem = showRight ? <i className={`tiny material-icons hide-icons ${props.hideArrow}`} onClick={() => updateStatus(studentId, status, 1)}>{props.rightArrow}</i> : "";

    return(
        <div className="name-options-container">
            <div className="button-arrows">
                {showLeftElem}
                <button className={props.addClass}>{props.fullName}</button>
                {showRightElem}
            </div>
            <div onClick={()=>showCan(itemDisplay, props.id)} className={`${props.addInfoClass} name-info-option`}>Info</div>
        </div>
    )
}