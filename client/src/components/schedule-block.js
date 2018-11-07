import React, { Component } from 'react';
import dummyData from './dummy-data';

// import {Chip} from 'materialize-css';


// import Modal from './helpers/modal'; need modal for editing interview


class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className='col s12 m4 l2'>
                <button className='interviewer-1'>{dummyData[0].firstName}</button>
                {/* made this a button so they can also handle edit */}
                <button className='interviewer-2'>{dummyData[1].firstName}</button>
                <div className='candidate'>{dummyData[2].firstName} {dummyData[2].lastName}</div>
            </div>

        )
    }
}
export default Block; 