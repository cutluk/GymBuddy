import React, { useState } from 'react'
import '../App.css'
import Switch from 'react-ios-switch'

import Group from './Group'
import Matches from './Matches'

function Home () {
  const [showGroup, setShowGroup] = useState(true)

  return (
    <div className='app'>
       <Matches />
      <div className='row'>
        
      </div>
    </div>
  )
}

export default Home;
