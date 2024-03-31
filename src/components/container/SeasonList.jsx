import React, { useState, useEffect } from 'react';
import SeasonReport from '../presentation/SeasonReport';
import SeasonListItem from '../presentation/SeasonListItem';
import { getDriverStandingsForAssignment, getAllRacesForYear } from '../../services/ApiService';
import './SeasonList.css';

export const SeasonList = () => {
  const [seasons, setSeasons] = useState([]);
  const [seasonRaces, setSeasonRaces] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedSeasonChampionId, setSelectedSeasonChampionId] = useState('');
  const [exploredSeasons, setExploredSeasons] = useState(1); // New state to track explored seasons
  const [totalSeasons, setTotalSeasons] = useState(0); // New state to track total seasons
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);


  useEffect(() => {
    let intervalId;
    if (timerStarted) {
      intervalId = setInterval(() => {
        setElapsedTime((Date.now() - startTime) / 1000);
      }, 1000);
    }
    return () => clearInterval(intervalId); // Cleanup interval
  }, [timerStarted, startTime]);


  const startTimer = () => {
    if (!timerStarted) {
      setTimerStarted(true);
      setStartTime(Date.now());
    }
  };

  const formatTime = () => {
    const elapsedTime = ((endTime || Date.now()) - startTime) / 1000; // Calculate elapsed time in seconds
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  



  useEffect(() => {
    getDriverStandingsForAssignment().then(
      (res) => {
        if (res.data) {
          const standingsLists = res.data.MRData.StandingsTable.StandingsLists;
          setSeasons(standingsLists);
          setTotalSeasons(standingsLists.length); // Update total seasons count
        }
      },
      (err) => {
        // Handle error
      }
    );
  }, []);

  const updateProgress = () => {
    const newProgress = (exploredSeasons / totalSeasons) * 100;
    setProgress(newProgress);

    if (newProgress === 100) {
      setEndTime(Date.now()); // Set end time when all seasons are explored
      const elapsedTime = (endTime - startTime) / 1000; // Calculate elapsed time in seconds
      if (elapsedTime < 45) {
        setPoints(points + 30); // Add 30 points if explored under 45 seconds
      } else if (elapsedTime < 60) {
        setPoints(points + 20); // Add 20 points if explored under 1 minute
      } else if (elapsedTime < 90) {
        setPoints(points + 5); // Add 5 points if explored under 1 minute and 30 seconds
      }
      // setShowCongratulations(true);
    }

  };

  const seasonClicked = (season, championId) => {
    startTimer();
    getAllRacesForYear(season).then(
      (res) => {
        if (res.data) {
          setSeasonRaces(res.data.MRData.RaceTable.Races);
          setSelectedSeason(season);
          setSelectedSeasonChampionId(championId);
          setExploredSeasons(exploredSeasons + 1); // Update explored seasons count
          updateProgress(); // Update progress after setting state
          setPoints(points + 20);
        }
      },
      (err) => {
        // Handle error
      }
    );
  };

  const seasonsList = seasons.map((seasonData) => (
    <SeasonListItem
      key={seasonData.season}
      season={seasonData.season}
      driverName={`${seasonData.DriverStandings[0].Driver.givenName} ${seasonData.DriverStandings[0].Driver.familyName}`}
      championId={seasonData.DriverStandings[0].Driver.driverId}
      constructorName={`${seasonData.DriverStandings[0].Constructors[0].name}`}
      onClick={seasonClicked}
    />
  ));

  return (
    <>

    <aside className='Menu'>
      <h1>1</h1>
      <h1>2</h1>
     

    </aside>

      <aside className='sidebar'>
        <h1 className='champion-header'>F1 World Champions</h1>
 
        {seasons.length > 0 ? seasonsList : 'Loading'}
      </aside>

      <main className='main-content'>

        {seasonRaces.length > 0 && (
        <> 
        <div className='game-info'>
          <h2 className='points'>Points: {points}  </h2>
          {timerStarted && (
          <h2 className='time'>Time: {formatTime(elapsedTime)}</h2> )}
           <progress className="progress-bar" value={progress} max="100"></progress>
        </div>
        
          <SeasonReport
            championId={selectedSeasonChampionId}
            races={seasonRaces}
            season={selectedSeason}
          />
          </>
        )}
      </main>
    </>
  );
};
