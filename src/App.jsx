import React, { useState } from 'react';
import './App.css';
import { SeasonList } from './components/container/SeasonList';

export default function App() {
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0);

  const instructions = [
    "Instruction 1: Go through all the world champions races before the timer turns red to earn extra points.",
    "Instruction 2: Every world champion explored gives you 20 points",
    "Instruction 3: If you finish while the timer is green, you get 20 points, if it is yellow, 10 points, red is 5 points .",
    "Click the first World Champion to start. Goodluck!"
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
