import React from 'react';
export default (props) =>{
    return(
        <div className={`input-field col ${props.inputClassContainer}`}>
            <input onChange={props.handleInputChange} name={props.name} value={props.value} id={props.name} type={props.type} className=""/>
            <label for={props.labelName} className="active">{props.labelTitle}</label>
            <div className={`hidDiv ${props.name}`}>{props.errorMessage}</div>
            <div className={`hidDiv ${props.secondErrorClass}`}>{props.secondErrorMessage}</div>
        </div>
    )
}