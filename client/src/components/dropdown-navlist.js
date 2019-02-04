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
                <ul className={`dropdown-navlist ${showNav}`}>
                    <Link to="/interviewer-homepage" className="dropdown-link">Home</Link>
                    <li className="divider" tabindex="-1"></li>
                    <Link to="/interviewer-signup" className="dropdown-link">Add User</Link>
                    <li className="divider" tabindex="-1"></li>
                    <Link to="/add-candidate" className="dropdown-link">Add Candidate</Link>
                    <li className="divider" tabindex="-1"></li>
                    <Link to="/interviewer-homepage" className="dropdown-link">Sign Out</Link>

                </ul>
            </div>
        )
    }
}
export default DropdownNavList;

