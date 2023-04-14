/*import React, { useState } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Richard Hendricks',
    age: 'Age: 21',
    experience: 'Beginner',
    contact: 'Contact: 123-456-7890',
    url: './GymPics/Gym1.jpg'
  },
  {
    name: 'Eric Bachman',
    age: 'Age: 26',
    experience: 'Expert',
    contact: 'Contact: 111-111-1111',
    url: './GymPics/gym2.jpeg'
  },
  {
    name: 'Monica Hall',
    age: 'Age: 23',
    experience: 'Beginner',
    contact: 'Contact: 222-222-2222',
    url: './GymPics/gym3.jpeg'
  },
  {
    name: 'Kylie Smith',
    age: 'Age: 22',
    experience: 'Intermediate',
    contact: 'Contact: 333-333-3333',
    url: './GymPics/gym4.jpeg'
  },
  {
    name: 'Josh Scheaffer',
    age: 'Age: 27',
    experience: 'Expert',
    contact: 'Contact: 444-444-4444',
    url: './GymPics/gym5.jpeg'
  }
]

function Simple () {
  const characters = db
  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, nameToDelete) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Your Matches 💪</h1>
      <div className='cardContainer'>
        {characters.map((character) =>
          <TinderCard className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
              <h2 className='personinfo'>
                <div>
                  {character.name}
                </div>
                <div>
                  {character.age}
                </div>
                <div>
                  {character.experience}
                </div>
               </h2>
            </div>
            <h1 className="cellNumber">
              {character.contact}
            </h1>
          </TinderCard>
        )}
      </div>
    </div>
  )
}

export default Simple
*/

import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'

const db = [
  {
    name: 'Richard Hendricks',
    age: 'Age: 21',
    experience: 'Beginner',
    contact: 'Contact: 123-456-7890',
    url: './GymPics/Gym1.jpg'
  },
  {
    name: 'Eric Bachman',
    age: 'Age: 26',
    experience: 'Expert',
    contact: 'Contact: 111-111-1111',
    url: './GymPics/gym2.jpeg'
  },
  {
    name: 'Monica Hall',
    age: 'Age: 23',
    experience: 'Beginner',
    contact: 'Contact: 222-222-2222',
    url: './GymPics/gym3.jpeg'
  },
  {
    name: 'Kylie Smith',
    age: 'Age: 22',
    experience: 'Intermediate',
    contact: 'Contact: 333-333-3333',
    url: './GymPics/gym4.jpeg'
  },
  {
    name: 'Josh Scheaffer',
    age: 'Age: 27',
    experience: 'Expert',
    contact: 'Contact: 444-444-4444',
    url: './GymPics/gym5.jpeg'
  }
]

function Matches () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

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
      <h1>Your Matches</h1>
      <div className='cardContainer'>
        {db.map((character, index) => (
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
                  {character.age}
                </div>
                <div>
                  {character.experience}
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
          You swiped {lastDirection}
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
