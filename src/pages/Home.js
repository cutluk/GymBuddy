import React, { useState } from 'react'
import '../App.css'
import Switch from 'react-ios-switch'

import Group from './Group'
import Matches from './Matches'

function Home () {
  const [showGroup, setShowGroup] = useState(true)

  return (
    <div className='app'>
      {showGroup ? <Group /> : <Matches />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show Matches</p> 
        <Switch checked={!showGroup} onChange={() => setShowGroup(!showGroup)} />
      </div>
    </div>
  )
}

export default Home;
