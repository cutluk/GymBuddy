import React, { useState } from 'react'
import '../App.css'
import Switch from 'react-ios-switch'

import Advanced from './Advanced'
import Simple from './Simple'

function Home () {
  const [showAdvanced, setShowAdvanced] = useState(true)

  return (
    <div className='app'>
      {showAdvanced ? <Advanced /> : <Simple />}
      <div className='row'>
        <p style={{ color: '#fff' }}>Show Matches</p> <Switch checked={showAdvanced} onChange={setShowAdvanced} />
      </div>
    </div>
  )
}

export default Home;
