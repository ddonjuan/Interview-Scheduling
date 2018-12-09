import React from 'react';

export default (props) => {
    const {showLeft, showRight, updateStatus, studentId, status} = props;
    const showLeftElem = showLeft ? <i className="medium material-icons hide-icons" onClick={() => updateStatus(studentId, status, -1)}>{props.leftArrow}</i> : "";
    const showRightElem = showRight ? <i className="tiny material-icons hide-icons" onClick={() => updateStatus(studentId, status, 1)}>{props.rightArrow}</i> : "";

    return(
        <div className="name-options-container">
            <div className="button-arrows">
                {showLeftElem}
                <button className={props.addClass}>{props.fullName}</button>
                {showRightElem}
            </div>
            <div className={`${props.addInfoClass} name-info-option`}>Info</div>
        </div>
    )
}