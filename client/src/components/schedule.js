import React, { Component } from 'react';
import Booth from './schedule-booths';
import Time from './schedule-time';
// import {Button, Icon} from 'react-materialize';
// import {Button, Icon} from 'materialize-css/dist/css/materialize.min.css';


// import Modal from './helpers/modal'; need modal for editing interview


class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // booth: '',
            // time: '',
            // interviewer1: '',
            // interviewer2: '',
            // candidate: ''
        }
        // this.handleInputChange = this.handleInputChange.bind(this); are we handling changes for all fields? interviewer and candidate
        // this.handleSelectOption = this.handleSelectOption.bind(this); turn this into handle interviewer change
        // }
        // handleInputChange(event) {
        //     const { value, name } = event.target;
        //     this.setState({
        //         [name]: value,
        //     });

        // }
        // handleSelectOption(event) {
        //     console.log("event: ", event);
        //     this.setState({
        //         department: event.target.value
        //     })
    }
    render() {
        // const {firstName, lastName, department} = this.state;

        return (
            <div className="container">
                <thead>
                    <tr>
                        <th data-field="interview-time">Interview Time</th>
                        <th data-field="booth-1">Booth #1</th>
                        <th data-field="booth-2">Booth #2</th>
                        <th data-field="booth-3">Booth #3</th>
                        <th data-field="booth-4">Booth #4</th>
                        <th data-field="booth-5">Booth #5</th>
                        <th data-field="booth-6">Booth #6</th>
                        <th data-field="booth-7">Booth #7</th>
                    </tr>
                </thead>

                <tbody>
                    <Time></Time>
                    <Booth></Booth>
                    <Booth></Booth>
                    <Booth></Booth>
                    <Booth></Booth>
                    <Booth></Booth>
                    <Booth></Booth>
                    <Booth></Booth>
                </tbody>

            </div>
        )
    }
}
export default Schedule;