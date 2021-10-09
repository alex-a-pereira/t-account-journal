import React, { useContext, useState } from 'react'

import { JournalEntry, EntryType } from '@typings'

import { dataStore } from './TEMP_initialData'

interface JournalData {
  journalEntries: JournalEntry[]
  createNewJournalEntry: Function
}

const JournalDataContext = React.createContext<JournalData>({
  journalEntries: dataStore.journalEntries,
  createNewJournalEntry: () => {}
})

export const JournalDataProvider: React.FC = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState(dataStore.journalEntries)

  const createNewJournalEntry = () => {
    // auo increments
    const entryNumber = journalEntries.length
    setJournalEntries([
      ...journalEntries,
      {
        entryNumber,
        debits: [{
          entryNumber,
          type: EntryType.debit,
          amount: 0,
          accountName: ''
        }],
        credits: [{
          entryNumber,
          type: EntryType.credit,
          amount: 0,
          accountName: ''
        }]
      }
    ])
  }

  const ctxVal = {
    journalEntries,
    createNewJournalEntry
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
