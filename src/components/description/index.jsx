import React from 'react';
import TickIcon from './Tick.png';
import './index.css';


const WorkDescription = ({ children, selected, handleClick, index, handleDelete }) => {
    return (<div className="work-description">
        <img className={`${selected ? 'selected' : ''}`} onClick={handleClick} src={TickIcon} alt="checked"/>
        {children}
        <span className="delete-icon" onClick={handleDelete}>
        x
        </span>
</div>)
}

export default WorkDescription;