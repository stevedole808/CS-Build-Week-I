import React, {useState, useCallback, useRef} from 'react';
import produce from 'immer'
import './App.css';
import { Button, Box, Container, ButtonGroup } from '@material-ui/core';

const numColumns = 25

const numRows = 25

const operations = [
  [0,1],
  [0,-1],
  [1,-1],
  [-1,1],
  [1,1],
  [-1,-1],
  [1,0],
  [-1,0]
]

const clearGrid = () => {
  const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numColumns), () => 0));
    }
    return rows;
}

function App() {
  const [grid, setGrid] = useState(() => {
    return clearGrid()
  });

  const[generation, setGeneration] = useState(0);

  const [running, setRunning] = useState(false);

  const runningRef = useRef();
  
  runningRef.current = running

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => {
      return produce(g, gridCopy => {
        for (let i = 0; i < numRows; i++) {
          for ( let j = 0; j < numColumns; j++) {
            let neighbors = 0;
              operations.forEach(([x, y]) => {
                const newI = i + x;
                const newJ = j + y;
                if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numColumns) {
                  neighbors += g[newI][newJ]
                }
              })

              if(neighbors < 2 || neighbors > 3) {
                gridCopy[i][j]  = 0
              } else if (g[i][j] === 0 && neighbors === 3) {
                gridCopy[i][j] = 1;
              } else gridCopy[i][j] = gridCopy[i][j];
          
          }
        }        
      });
    });
    setGeneration(prev => prev + 1)
    if(runningRef.current) {
        setTimeout(runSimulation, 1000);
    }
  }, [])

  const preset1 = () => {
    if(!running) {
      const gridCopy = produce(grid, grid2 => {
        grid2[4][2] = 1
        grid2[5][3] = 1
        grid2[6][3] = 1
        grid2[3][3] = 1
        grid2[4][4] = 1
        grid2[4][3] = 1
        grid2[5][1] = 1
        grid2[5][5] = 1
        grid2[7][3] = 1
        grid2[8][3] = 1
      })
      setGrid(gridCopy)
    }
  }

  const preset2 = () => {
    if(!running) {
      const gridCopy = produce(grid, grid2 => {
        grid2[11][11] = 1
        grid2[12][11] = 1
        grid2[13][11] = 1
        grid2[13][10] = 1
        grid2[12][9] = 1
      })
      setGrid(gridCopy)
    }
  }

  return (
    <>
    <h1
    style={{
      display: 'flex',
      textAlign: 'center',
      AlignItems: 'center',
      justifyContent: 'center', 
  }}
    >
      Welcome To The Game Of Life</h1>
    <Container
      style={{
        display: 'flex',
        textAlign: 'center',
        AlignItems: 'center',
        justifyContent: 'center',      
    }}
    >
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${numColumns}, 20px)`,
            AlignItems: 'center',
            justifyContent: 'center',    
          }}
        >
        {grid.map((rows, i) => 
          rows.map((col, k) => (
            <div 
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, gridCopy => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                })
                setGrid(newGrid)
              }}
              style={{
                width: 20,
                height: 20, 
                backgroundColor: grid[i][k] ? 'red': undefined, 
                border: 'solid 1.5px black',
              }} 
            />
          ))
        )}
        </div>
    </Container>
    <Box
    style={{
      display: 'flex',
      textAlign: 'center',
      AlignItems: 'center',
      justifyContent: 'center',  
      marginTop: '50px' ,
      marginBottom: '100px'   
  }}
    >
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group" >
        <Button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
          }}
            }
        >
          {running ? "Stop" : "Start"}
        </Button>
        <Button 
        onClick={() => {
          setGrid(clearGrid());
        }}>
          Clear
        </Button>
        <Button 
          onClick={() => {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numColumns), () => Math.random() > .8 ? 1 : 0));
            }
            setGrid(rows)
            }}
        >
          Random
        </Button>
        <Button>
          <h4 width='300px'>Choose A Preset:</h4>
          {!running && <button onClick={preset1}>Avatar</button>}
          {!running && <button onClick={preset2}>Slider</button>}
        </Button>
      </ButtonGroup>
    </Box>
  </>
  )
}

export default App;