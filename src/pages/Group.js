import React, { useState, useMemo, useRef, useEffect } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Richard Hendricks',
    age: 'Age: 21',
    experience: 'Beginner',
    url: './GymPics/gym1.jpeg'
  },
  {
    name: 'Eric Bachman',
    age: 'Age: 26',
    experience: 'Expert',
    url: './GymPics/gym2.jpeg'
  },
  {
    name: 'Monica Hall',
    age: 'Age: 23',
    experience: 'Beginner',
    url: './GymPics/gym3.jpeg'
  },
  {
    name: 'Kylie Smith',
    age: 'Age: 22',
    experience: 'Intermediate',
    url: './GymPics/gym4.jpeg'
  },
  {
    name: 'Josh Scheaffer',
    age: 'Age: 27',
    experience: 'Expert',
    url: './GymPics/gym5.jpeg'
  }
]

function Group () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [data, setData] = useState([{}]);
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
      .then(response => response.json())
      .then(data => setData(data));
   }
  useEffect(() => {
    fetchHandler();
  }, []);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

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
    if (canSwipe && currentIndex < db.length) {
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
      <h1>Gym Buddy 💪</h1>
      <div>
     
    </div>
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
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className='infoText'>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className='infoText'>
          Swipe a card or press a button to get started!
        </h2>
      )}
    </div>
  )
}

export default Group
