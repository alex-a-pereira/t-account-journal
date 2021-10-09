import React, { useContext } from 'react'

import { JournalEntry } from '@typings'

import { dataStore } from './TEMP_initialData'

interface JournalData {
  journalEntries: JournalEntry[]
}

const JournalDataContext = React.createContext<JournalData>({
  journalEntries: dataStore.journalEntries
})

export const JournalDataProvider: React.FC = ({ children }) => {
  const ctxVal = {
    journalEntries: dataStore.journalEntries
  }

  return (
    <JournalDataContext.Provider value={ctxVal}>
      {children}
    </JournalDataContext.Provider>
  )
}

export const useJournalDataContext = () => {
  return useContext(JournalDataContext)
}
