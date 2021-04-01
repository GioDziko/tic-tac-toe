import React,{useState,useEffect} from 'react'
import Board from './components/Board';
import Game from './components/Game';
import './app.css';

const App = () => {
    const [row, setrow] = useState(0);
    const [column, setcolumn] = useState(0);
    const [sequence, setsequence] = useState(0);
    const [startgame, setstartgame] = useState(false);
    const [game, setgame] = useState([]);
    
    if(row>0 && column>0){
        var temp = new Array(row*column);
    }
    useEffect(() => {
        if(row>0 && column>0){
            temp.fill('');
            setgame([...temp]);
        }
        
    }, [row,column])
    
    return (
        <div className='App' >
            {!startgame ? 
                <Board 
                row={row}
                column={column}
                sequence={sequence}
                setrow={setrow}
                setcolumn={setcolumn}
                setsequence={setsequence}
                setstartgame={setstartgame}
                /> 
                : 
                <Game
                game={game}
                setgame={setgame}
                row={row}
                column={column}
                sequence={sequence}
                />
            }
        </div>
    )
}

export default App
