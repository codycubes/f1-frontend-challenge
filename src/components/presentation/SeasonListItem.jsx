import React, { useState } from 'react';
import './SeasonListItem.css'; 


export default function SeasonListItem(props) {
  // Destructuring props
  const { season, driverName, championId, constructorName, onClick } = props;
  const [clicked, setClicked] = useState(false);

  // Function to handle item click
  const handleClick = () => {
    onClick(season, championId); 
    setClicked(true); 
  };


  return (
    <div
      className={`season-card ${clicked ? 'clicked' : ''}`} // Apply 'clicked' class if the item has been clicked
      onClick={handleClick} 
    >
      <div className='description'>
        <h1 className='driver-name'>{driverName}</h1> {/* Display driver's name */}
        <h2 className='constructor-name'>{constructorName}</h2> {/* Display constructor's name */}
        <h1 className='season-year'>{season}</h1> {/* Display season year */}
      </div>
    </div>
  );
}
