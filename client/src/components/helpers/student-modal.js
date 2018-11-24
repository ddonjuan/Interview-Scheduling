import React from 'react';
import {showElement} from '../helpers/handle-input-helper';

export default (props) => {
    return (
        <div className={`container modal-container-custom ${props.id} hidden`}>
            <div className="z-depth-4 modal-content-custom">
                <h4>{props.title}</h4>
                <h5 id="modal-name">{props.name}</h5>
                <h5 id="modal-department">{props.department}</h5>
                <h5 id="modal-school">{props.school}</h5>
                <div className="modal-footer-custom">
                    <button onClick={()=>{showElement(`${props.id}`)}} className="waves-effect waves-light red btn">Cancel</button>
                    <button onClick={()=>{props.submit()}}className="waves-effect waves-light btn">Confirm</button>
                </div>
            </div>
        </div>
    )
}