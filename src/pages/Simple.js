import React, { useState } from 'react'
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
