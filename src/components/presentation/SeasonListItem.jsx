import React, { useState } from 'react';
import './SeasonListItem.css';

export default function SeasonListItem(props) {
  const { season, driverName, championId, constructorName, onClick } = props;
  const [clicked, setClicked] = useState(false); // State to track if the item has been clicked

  const handleClick = () => {
    onClick(season, championId);
    setClicked(true); // Set clicked to true when the item is clicked
  };

  return (
    <div
      className={`season-card ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
    >
 
      <div className='description'>
        <h1 className='driver-name'>{driverName}</h1>
        <h2 className='constructor-name'>{constructorName}</h2>
        <h1 className='season-year'>{season}</h1>
      </div>
    </div>
  );
}
