import React from 'react';
import { RaceListItem } from './RaceListItem'; 
import './SeasonReport.css'; 


export default function SeasonReport(props) {

  const { season, championId } = props;

  // Mapping season races or displaying 'Loading' if races are not available
  const seasonRaces = props.races.length > 0
    ? props.races.map((race) => (
      <RaceListItem
        key={race.round}
        round={race.round}
        raceName={race.raceName}
        driverName={`${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}`}
        constructorName={race.Results[0].Constructor.name}
        highLighted={championId === race.Results[0].Driver.driverId} // Highlight if the driver is the champion
      />
    ))
    : 'Loading';


  return (
    <div className="season-report">
      <div className='season-header'>
        <h3>Season: {season}</h3> {/* Display season */}
      </div>

      <div className="list-header">
        <div className="list-header-item">
          Round/Race
        </div>
        <div className="list-header-item">
          Winner
        </div>
        <div className="list-header-item">
          Auto Make
        </div>
      </div>

      {seasonRaces} {/* Display season races */}
    </div>
  );
}
