import React, { useState } from 'react';
import './App.css'; 
import { SeasonList } from './components/container/SeasonList'; 


export default function App() {
  // State variables using useState hook
  const [showInstructions, setShowInstructions] = useState(true); 
  const [currentInstructionIndex, setCurrentInstructionIndex] = useState(0); 

  // Array of instructions
  const instructions = [
    "Instruction 1: Go Through All The World Champions Races Before The timer Turns Red To Earn Extra Points.",
    "Instruction 2: Every World Champion Explored Gives You 20 Points",
    "Instruction 3: If You Finish While The Timer Is Green, You Get 20 Points, If It Is Yellow, 10 points, Red is 5 Points.",
    "Click On The First World Champion To Start. Goodluck!"
  ];

  // Function to handle showing next instruction or close overlay
  const handleNextInstruction = () => {
    if (currentInstructionIndex < instructions.length - 1) {
      setCurrentInstructionIndex(currentInstructionIndex + 1); // Move to the next instruction
    } else {
      setShowInstructions(false); // Close instructions overlay
    }
  };


  return (
    <div className="app-container">
      {/* Instructions overlay */}
      {showInstructions && (
        <div className="instructions-overlay">
          <div className="instructions-box">
            <p>{instructions[currentInstructionIndex]}</p> {/* Display current instruction */}
            <button onClick={handleNextInstruction}>
              {currentInstructionIndex < instructions.length - 1 ? 'Next' : 'Close'} {/* Next button or Close button */}
            </button>
          </div>
        </div>
      )}

      {/* Main page content */}
      <div className='main-page'>
        <SeasonList /> 
      </div>
    </div>
  );
}
