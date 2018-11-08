import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class DropdownNavList extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const {showNavDropDown} = this.props;
        const showNav = showNavDropDown ? 'showNav' : '';
        return(
            <div className="container">
                <ul className={`dropdown-navlist blue ${showNav}`}>
                    <li>Profile</li>
                    <li class="divider" tabindex="-1"></li>
                    <Link to="/interviewer-signup" className="dropdown-link">Add User</Link>
                </ul>
            </div>
        )
    }
}
export default DropdownNavList;