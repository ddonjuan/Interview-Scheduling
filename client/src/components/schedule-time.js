import React, { Component } from 'react';
import Booth from './schedule-booths';
// import {Button, Icon} from 'react-materialize';
// import {Button, Icon} from 'materialize-css/dist/css/materialize.min.css';


// import Modal from './helpers/modal'; need modal for editing interview


class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <tr>
            <td s={1} className='time'>8:30</td>
            <Booth></Booth>
            </tr>
        )
    }
}
export default Time;