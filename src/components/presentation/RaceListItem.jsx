import React from 'react';
import './RaceListItem.css'; 

export const RaceListItem = (props) => {
    const { round, raceName, driverName, constructorName, highLighted } = props;
    
    // Constructing className based on props
    let classNames = 'row race-list-item';
    if (highLighted) {
        classNames += ' highlighted';
    }
    
    return (
        <div className={classNames}>
            <div className="race-details">
                Round {round}: {raceName}
            </div>
            <div className="race-details">
                {driverName}
            </div>
            <div className="race-details">
                {constructorName}
            </div>
        </div>
    );
}
