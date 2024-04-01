import React, { useState, useEffect } from 'react';
import SeasonReport from '../presentation/SeasonReport';
import SeasonListItem from '../presentation/SeasonListItem';
import { getDriverStandingsForAssignment, getAllRacesForYear } from '../../services/ApiService';
import './SeasonList.css';

export const SeasonList = () => {


    // State variables using useState hook
  const [seasons, setSeasons] = useState([]);
  const [seasonRaces, setSeasonRaces] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedSeasonChampionId, setSelectedSeasonChampionId] = useState('');
  const [exploredSeasons, setExploredSeasons] = useState(1);
  const [totalSeasons, setTotalSeasons] = useState(0);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);


    // useEffect to handle timer logic
  useEffect(() => {
    let intervalId;
    if (timerStarted) {
      intervalId = setInterval(() => {
        setEndTime(Date.now()); // Update endTime to current time
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerStarted]);


    // Function to start the timer
  const startTimer = () => {
    if (!timerStarted) {
      setTimerStarted(true);
      setStartTime(Date.now());
    }
  };


    // Function to format time for display
  const formatTime = () => {
    const elapsedTime = ((endTime || Date.now()) - startTime) / 1000;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime % 60);

    let timerColor = '#00FF00'; // default green
    if (elapsedTime >= 90) {
      timerColor = '#FF0000'; // red
    } else if (elapsedTime >= 60) {
      timerColor = '#FFFF00'; // yellow
    }
  

    return (
      <span style={{ color: timerColor }}>
        {`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
      </span>
    );
  };


    // useEffect to fetch driver standings for assignment
  useEffect(() => {
    getDriverStandingsForAssignment().then(
      (res) => {
        if (res.data) {
          const standingsLists = res.data.MRData.StandingsTable.StandingsLists;
          setSeasons(standingsLists);
          setTotalSeasons(standingsLists.length);
        }
      },
      (err) => {
        // Handle error
      }
    );
  }, []);

 // Function to update progress based on explored seasons
  const updateProgress = () => {
    const newProgress = (exploredSeasons / totalSeasons) * 100;
    setProgress(newProgress);

    if (newProgress === 100) {
      const elapsedTime = ((endTime || Date.now()) - startTime) / 1000; // Calculate elapsed time here
      if (elapsedTime < 60) {
        setPoints(points + 30);
      } else if (elapsedTime < 90) {
        setPoints(points + 20);
      } else if (elapsedTime < 120) {
        setPoints(points + 5);
      }
    }
  };



   // Function to handle season selection
  const seasonClicked = (season, championId) => {
    startTimer();
    getAllRacesForYear(season).then(
      (res) => {
        if (res.data) {
          setSeasonRaces(res.data.MRData.RaceTable.Races);
          setSelectedSeason(season);
          setSelectedSeasonChampionId(championId);
          setExploredSeasons(exploredSeasons + 1);
          updateProgress();
          setPoints(points + 20);
        }
      },
      (err) => {
        // Handle error
      }
    );
  };


    // Generate list of seasons
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
        {/* <h1>1</h1>
        <h1>2</h1> */}
      </aside>

      <aside className='sidebar'>
        <h1 className='champion-header'>F1 World Champions</h1>
        {seasons.length > 0 ? seasonsList : 'Loading'}            {/* Display seasons list or 'Loading' message */}
      </aside>

      <main className='main-content'> {/* Display race info if available */}
        {seasonRaces.length > 0 && (                             
          <>
            <div className='game-info'>
              <h2 className='points'>Points: {points} XP</h2> {/* Display points earned */}
              {timerStarted && (
                <h2 className='time'>Time: {formatTime()}</h2>  
              )}                                              {/* Format and display timer */}

              <progress className="progress-bar" value={progress} max="100"></progress>     {/* Display progress bar */}
            </div>
        
                {/*Displays the world champions*/}
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


