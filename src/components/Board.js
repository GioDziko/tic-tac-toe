import React from 'react'
import './css/board.css';
const Board = ({setrow,setcolumn,setsequence,setstartgame,row,column,sequence}) => {
    return (
        <div className='board' >
            <h1>Tic Tac Toe</h1>
            <div className="Board-input-container" >
                <h3>Change the row</h3>
                <input type='number' min='3' onChange={(e)=>setrow(e.target.value)} placeholder='min 3' />
            </div>
            <div className="Board-input-container" >
                <h3>Change the Column</h3>
                <input type='number' min='3' onChange={(e)=>setcolumn(e.target.value)} placeholder='min 3' />
            </div>
            <div className="Board-input-container" >
                <h3>winning point?</h3>
                <input type='number' min='3' onChange={(e)=>setsequence(e.target.value)} placeholder='sequence' />
            </div>
            {column <3 || row <3 || sequence<3 ? 
            <button disabled className="disabled" onClick={()=>{setstartgame(true)}}>Start game</button>
            :
            <button className="Board-btn" onClick={()=>{setstartgame(true)}}>Start game</button>
            }
            
        </div>
    )
}

export default Board
