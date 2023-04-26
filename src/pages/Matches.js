
import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'



function Matches () {
  const [currentIndex, setCurrentIndex] = useState(null)
  const [lastDirection, setLastDirection] = useState()
  const [data, setData] = useState([{}]);
  const [stats, setStats] = useState([{}]);
  
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)
  const fetchHandler = async () => {
    const response = await fetch('http://localhost:3001/data', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      const { data, stats } = await response.json();
      setData(data);
      setStats(stats);
      setCurrentIndex(data.length - 1);
      console.log('data size: ' + data.length);
   }
  useEffect(() => {
    fetchHandler();
  }, []);

 
  const childRefs = useMemo(() =>
   // Array(data.length).fill(0).map(i => React.createRef()), [data.length]
    Array.from({ length: data.length }, () => React.createRef()), [data.length]);
   

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < data.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    console.log("childrefs, currentindex, data length")
    console.log(childRefs)
    console.log(currentIndex)
    console.log(data.length)
    if (canSwipe && currentIndex < data.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <h1>🔥 Your Matches 🔥</h1>
      <h3 className='statsInfo'>There are {stats.length} people better than you 😈</h3>
      <div className='cardContainer'>
        {data.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ 
                backgroundImage: 'url(' + character.url + ')',
                backgroundColor: 'black'
              }}
              className='card'
            >
              <h2 className="personinfo">
                <div>
                  {character.name}
                </div>
                <div>
                  Age: {character.age}
                </div>
                <div>
                  Exp: {character.experience}
                </div>
              </h2>
            </div>
            <h1 className="cellNumber">
              {character.contact}
            </h1>
          </TinderCard>
        ))}
      </div>
        <div className='matchbuttons'></div>
        <div className='buttons'>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
          <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
          <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
        </div>
        {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You have {currentIndex +1} matches left!
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe to see your matches!!!
        </h2>
      )}
    </div>
  )
}

export default Matches
