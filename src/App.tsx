import React from 'react'
import './App.scss'
// context providers
import { JournalDataProvider } from '@providers/JournalDataProvider'
// nav
import { AppRouter } from '@setup/Router/router'

function App () {
  return (
    <div className='App'>
      <JournalDataProvider>
        <AppRouter>
          {/* placeholder for future stuff */}
          <div />
        </AppRouter>
      </JournalDataProvider>
    </div>
  )
}

export default App
