import React, { Component } from 'react';

class SelectDropDown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { selectTitle, selectClasses, submit, id, value } = this.props;
        const optionsElement = value.map((item, index)=>{
            return(
                <option value={item} key={index}>{item}</option>
            )
        })
        return (
            <select key={id} onChange={submit} className={`browser-default ${selectClasses}`} ref="function">
                <option value="" disabled selected>{selectTitle}</option>
                {optionsElement}
            </select>)
    }
}
export default SelectDropDown;