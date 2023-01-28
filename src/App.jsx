import { useState } from 'react'
import GameTimer from './GameTimer'
import Logger from './Logger'
import './App.css'

function App() {
  
  const [xNum, setXNum] = useState(1)
  const [yNum, setYNum] = useState(1)
  const [timeBetween, setTimeBetween] = useState(0)
  const [startClicked, setStartClicked] = useState(true)
  const [newColor, setNewColor] = useState('#FF0000')
  const [totalCount, setTotalCount] = useState(1) //logs total clicks
  const [circleCount, setCircleCount] = useState(1) //logs circle clicks
  const [gameTimer, setGameTimer] = useState()
  const [startTimer, setStartTimer] = useState(false)
  const colors = ['#ee82ee', '#00FFFF', '#6495ED', '#8A2BE2', '#FFD700', '#191970', '#7fff00', '#8b00b8', '#ff1493', '#48d1cc']
  // const [diff, setDiff] = useState(3000)
  // let circleTime = useRef(null);
  let circleTime;
  const [avgTime, setAvgTime] = useState([]);
  function startGame() {
    setCircleCount(1)
    setTotalCount(1)
    setTimeBetween(1)
    circleTimer()
    setGameTimer(0)
    setAvgTime([])
    setStartClicked(!startClicked)
    setStartTimer(!startTimer)
  }
  const circleTimer = () => {
    circleTime = setTimeout(createRandomCircles, 2000)
    // clearTimeout(circleTime)
    return (createRandomCircles() && circleTime)

  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)]
  }
  const color = { backgroundColor: `${newColor}` }
  const y = { marginTop: `${yNum}px` }
  const x = { marginInline: `${xNum}px` }

  function createRandomCircles() {
    let x1 = getRandomNumber(1, 800)
    let y1 = getRandomNumber(1, 500)
    let nc = getRandomColor()
    setNewColor(nc)
    setXNum(x1)
    setYNum(y1)
  }

  function clickCounter(state, setter) {
    let clicks = state
    clicks += 1
    setter(clicks)

  }
  function handleClickInCircle() {
    betweenTime()
    addToAvg()
    clickCounter(circleCount, setCircleCount)
    createRandomCircles()
    circleTimer()

  }

  let hits = circleCount - 1
  let total = totalCount - 1
  let missed = totalCount - circleCount
  let avg;
  let hitAcc = 0

  function hitAccuracy() {
    let hitAcc = (hits / total) * 100
    return hitAcc;
  }
  hitAcc = hitAccuracy()
  function endGame() {
    console.log("missed:", missed, "hits:", hits, "total:", total, "timebetweenavg:", avg, "hitacc:", hitAcc, "user:", user.id, "game:", game_id)
    clearTimeout(circleTime)
    circleTime = null
    setStartClicked(!startClicked)
    avg = avgAllTime()
    currentUP()
  }
  const circle = <div className="circle" style={Object.assign({}, x, y, color)} onClick={() => {
    handleClickInCircle();
  }
  }></div>


  function betweenTime() {
    setTimeBetween(gameTimer)
  }

  function addToAvg() {
    const speed = gameTimer - timeBetween;
    setAvgTime(avgTime => [...avgTime, speed])
  }
  function avgAllTime() {
    let total = 0;
    let count = 0;
    avgTime.forEach((item) => {
      total += item;
      count++;
    });
    return total / count;
  }


  return (
    <div className="App">
      <div id="container">
        <GameTimer gameTimer={gameTimer} setGameTimer={setGameTimer} endGame={endGame} startTimer={startTimer} />
        <Logger missedClicks={missed} circleCount={circleCount} totalCount={totalCount} hitAcc={hitAcc} startClicked={startClicked} />
        {startClicked ? <button id="start_button" onClick={startGame}>START</button> : null}
        <div id='playbox' onClick={() => clickCounter(totalCount, setTotalCount)}>
          {startClicked ? null : <div>{circle}</div>}
        </div> 
      </div>
    </div>
  )
}

export default App
