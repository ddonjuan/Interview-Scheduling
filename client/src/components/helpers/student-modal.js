import React from 'react';
import { showElement } from '../helpers/handle-input-helper';

export default (props) => {
    return (
        <div onClick={() => { showElement(`${props.id}`) }} className={`container modal-container-custom ${props.id} hidden`}>
            <div className="z-depth-4 modal-content-custom">
            <i class="tiny material-icons right close-modal">close</i>
                <div className="candidate-info-container">
                    <h4>{props.name}</h4>
                    <h5 id="modal-name">School: {props.school}</h5>
                    <h5 id="modal-department">Department: {props.department}</h5>
                    <h5>Email: {props.email}</h5>
                    <h5>Phone: {props.phone}</h5>
                    <h5 className="resume-modal">Resume: <i className="tiny material-icons resume-icon"><a target="_blank" href={props.cv}>launch</a></i></h5>

                </div>

                <div className="modal-footer-custom">
                    <button  className="waves-effect waves-light red btn">Close</button>
                </div>
            </div>
        </div>
    )
}