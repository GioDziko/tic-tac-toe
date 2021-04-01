import React,{useState,useEffect} from 'react'
import './css/game.css';
const Game = ({setgame,game,row, column, sequence}) => {
    
    const [boolean, setboolean] = useState(true);
    const [win, setwin] = useState(false);
    const [draw, setdraw] = useState(false);
    const [disable, setdisable] = useState(false);
    var temp=[...game];
    useEffect(() => {
        setgame([...temp]);
        document.querySelector('.game').style.setProperty('grid-template-columns', 'repeat(' + row + ', 50px)');
    }, [])

    //Check symbol positions
    const checkLeft=(index)=>{
        if(index%row===0){
            return 1
        }else{
            return 0
        }
    }
    const checkRight=(index)=>{
        if((Number(index)+1)%row===0){
            return 1
        }else{
            return 0
        }
    }
    const checkTop=(index)=>{
        if(Number(index)<row){
            return 1
        }else{
            return 0
        }
    }
    const checkBottom=(index)=>{
        if(index<row*column && index>=row*column-row){
            return 1
        }else{
            return 0
        }
    }
    //Winning positions
    const checkWin=(index)=>{
        vertical(index);
        horizontal(index);
        nMainDiagonal(index);
        MainDiagonal(index);
    }
    //Draw position
    const checkDraw=()=>{
        if(temp.filter(word=>word==="").length==0){
            setdisable(true);
            setdraw(true);
        }
    }
    //Game logic
    const horizontal=(index)=>{
        var counter=1;
        var symbol=boolean? "X":"0";
        var winningindex=[Number(index)];
        for(let i=1;i<=sequence;i++){
            if(checkRight(Number(index)+i-1)===1){
                break;
            }else{
                if(temp[Number(index)+i]===symbol){
                    counter++;  
                    winningindex.push(Number(index)+i);
                }else{
                    break;
                }
            }
        }
        for(let i=1;i<=sequence;i++){
            if(checkLeft(Number(index)-i+1)===1){
                break
            }else{
                if(temp[Number(index)-i]===symbol){
                    counter++;  
                    winningindex.push(Number(index)-i)
                }else{
                    break;
                }
            }
        }
        if(counter >= sequence){
            for(let i=0;i<winningindex.length;i++){
                document.querySelector(`.game button:nth-child(${winningindex[i]+1})`).classList.add('Winner')
            }
            finishGame();
        }
    }
    
    const vertical=(index)=>{
        var counter=1;
        var symbol=boolean? "X":"0";
        var winningindex=[Number(index)];
        for(let i=1,k=Number(row);i<=sequence;i++,k+=Number(row)){
            if(checkBottom(Number(index)+k-Number(row))===1){
                break;
            }else{
                if(temp[Number(index)+k]===symbol){
                    counter++;  
                    winningindex.push(Number(index)+k);
                }else{
                    break;
                }
            }
        }
        for(let i=1,k=Number(row);i<=sequence;i++,k+=Number(row)){
            
            if(checkTop(Number(index)-k+Number(row))===1){
                break
            }else{
                if(temp[Number(index)-k]===symbol){
                    counter++;  
                    winningindex.push(Number(index)-k)
                }else{
                    break;
                }
            }
        }
        if(counter >= sequence){
            for(let i=0;i<winningindex.length;i++){
                document.querySelector(`.game button:nth-child(${winningindex[i]+1})`).classList.add('Winner')
            }
            finishGame();
        }
    }

    const nMainDiagonal=(index)=>{
        var counter=1;
        var symbol=boolean? "X":"0";
        var winningindex=[Number(index)];
        for(let i=1,k=Number(row)+1;i<=sequence;i++,k+=Number(row)+1){
            if(checkBottom(Number(index)+k-Number(row)-1)===1 ||checkRight(Number(index)+k-Number(row)-1)===1){
                break;
            }else{
                if(temp[Number(index)+k]===symbol){
                    counter++; 
                    winningindex.push(Number(index)+k); 
                }else{
                    break;
                }
            }
        }
        for(let i=1,k=Number(row)+1;i<=sequence;i++,k+=Number(row)+1){
            
            if(checkTop(Number(index)-k+Number(row)+1)===1 || checkLeft(Number(index)-k+Number(row)+1)===1){
                break
            }else{
                if(temp[Number(index)-k]===symbol){
                    counter++;  
                    winningindex.push(Number(index)-k);
                }else{
                    break;
                }
            }
        }
        if(counter >= sequence){
            for(let i=0;i<winningindex.length;i++){
                document.querySelector(`.game button:nth-child(${winningindex[i]+1})`).classList.add('Winner')
            }
            finishGame();
        }
    }

    const MainDiagonal=(index)=>{
        var counter=1;
        var symbol=boolean? "X":"0";
        var winningindex=[Number(index)];
        for(let i=1,k=Number(row)-1;i<=sequence;i++,k+=Number(row)-1){
            if(checkBottom(Number(index)+k-Number(row)+1)===1 ||checkLeft(Number(index)+k-Number(row)+1)===1){
                break;
            }else{
                if(temp[Number(index)+k]===symbol){
                    counter++;  
                    winningindex.push(Number(index)+k);
                }else{
                    break;
                }
            }
        }
        for(let i=1,k=Number(row)-1;i<=sequence;i++,k+=Number(row)-1){
            
            if(checkTop(Number(index)-k+Number(row)-1)===1 || checkRight(Number(index)-k+Number(row)-1)===1){
                break
            }else{
                if(temp[Number(index)-k]===symbol){
                    counter++;  
                    winningindex.push(Number(index)-k);
                }else{
                    break;
                }
            }
        }
        if(counter >= sequence){
            for(let i=0;i<winningindex.length;i++){
                document.querySelector(`.game button:nth-child(${winningindex[i]+1})`).classList.add('Winner')
            }
            finishGame();
        }
    }
    const finishGame=()=>{
        setdisable(true);
        setwin(true);
    }
    const clickhandler=(e)=>{
        if(boolean){
            if(temp[e.target.value]==''){
                temp[e.target.value]="X";
                setboolean(!boolean);
            }
        }else{
            if(temp[e.target.value]==''){
                temp[e.target.value]="0";
                setboolean(!boolean);
            }
        }
        setgame(temp)
        checkWin(e.target.value);
        checkDraw(e.target.value);
    }
    return (
        <div className='game-container'>
            <div className='game-textholder' >
                <h1>Tic-Tac-Toe</h1>
            </div>
            <div className="game">
                {
                    game.map((item,index)=>
                    <button disabled={disable} 
                        key={`button${index}`} 
                        className="game-btn" value={index} 
                        onClick={clickhandler}>{item}
                    </button>)
                }
            </div>
            <div>
                {win&&
                <div className='game-winner-container' >
                    <p>Congratulations {boolean? "0 Wins" : "X Wins"}</p>
                    <button className='playAgain-btn' onClick={()=>{window.location.reload(false);}} >Play again</button>
                </div>}
                {draw&&
                <div className='game-winner-container' >
                    <p>Game is Draw</p>
                    <button className='playAgain-btn' onClick={()=>{window.location.reload(false);}} >Play again</button>
                </div>}
            </div>
        </div>
    )
}
export default Game
