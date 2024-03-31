import React, { useState } from 'react';
import './App.css';
import { SeasonList } from './components/container/SeasonList';

export default function App() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

  const instructions = [
    "Instruction 1: Go Through All The World Champions Races Before The timer Turns Red To Earn Extra Points.",
    "Instruction 2: Every World Champion Explored Gives You 20 Points",
    "Instruction 3: If You Finish While The Timer Is Green, You Get 20 Points, If It Is Yellow, 10 points, Red is 5 Points.",
    "Click On The First World Champion To Start. Goodluck!"
  ];

  const handleNextInstruction = () => {
    if (currentInstructionIndex < instructions.length - 1) {
      setCurrentInstructionIndex(currentInstructionIndex + 1);
    } else {
      // Close the instructions pop-up when reached the end
      setShowInstructions(false);
    }
  };

  const handleCloseInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <div className="app-container">
      {showInstructions && (
        <div className="instructions-overlay">
          <div className="instructions-box">
            <p>{instructions[currentInstructionIndex]}</p>
            <button onClick={handleNextInstruction}>
              {currentInstructionIndex < instructions.length - 1 ? 'Next' : 'Close'}
            </button>
            {/* {currentInstructionIndex > 0 && (
              <button onClick={handleCloseInstructions}>Close</button>
            )} */}
          </div>
        </div>
      )}

      <div className='main-page'>
        <SeasonList />
      </div>
    </div>
  );
}
