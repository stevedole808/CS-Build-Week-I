import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const numColumns = 50
const numRows = 50

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }

    return rows
  });

  return(
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numColumns}, 20px)`
    }}>
    {grid.map((rows, i) => 
      rows.map((col, k) => (
        <div 
          key={`${i}-${k}`}
          style={{
            width: 20,
            height: 20, 
            backgroundColor: grid[i][k] ? 'red': undefined, 
            border: 'solid 1px black'
          }} 
        />
      ))
    )}
  </div>
  )
}

export default App;
