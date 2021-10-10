import React from 'react'
import './App.scss'
// context providers
import { JournalDataProvider } from '@providers/JournalDataProvider'
// UI
import { SiteHeader } from '@components/SiteHeader/SiteHeader'
// nav
import { AppRouter } from '@setup/Router/router'

function App () {
  return (
    <div className='App'>
      <SiteHeader />
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
