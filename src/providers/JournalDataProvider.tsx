import React, { useContext, useState } from 'react'

import { JournalEntry, EntryType, JournalEntryNumber } from '@typings'

import { dataStore } from './TEMP_initialData'

interface JournalData {
  journalEntries: JournalEntry[]
  createNewJournalEntry: Function,
  deleteJournalEntry: Function
}

const JournalDataContext = React.createContext<JournalData>({
  journalEntries: dataStore.journalEntries,
  createNewJournalEntry: () => {},
  deleteJournalEntry: () => {}
})

export const JournalDataProvider: React.FC = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState(dataStore.journalEntries)

  const deleteJournalEntry = (entryNumber: JournalEntryNumber) => {
    const idxToRemove = journalEntries.findIndex(je => je.entryNumber === entryNumber)
    const newJournalEntries = [
      ...journalEntries.slice(0, idxToRemove),
      ...journalEntries.slice(idxToRemove + 1, journalEntries.length)
    ].map((je, idx) => {
      // re-indexes all the JournalEntry.entryNumber from 0, as deleting would mess up ordering
      return { ...je, entryNumber: idx }
    })

    setJournalEntries(newJournalEntries)
  }

  const createNewJournalEntry = () => {
    // auo increments
    const entryNumber = journalEntries.length
    setJournalEntries([
      ...journalEntries,
      {
        entryNumber,
        debits: [{
          type: EntryType.debit,
          amount: 0,
          accountName: ''
        }],
        credits: [{
          type: EntryType.credit,
          amount: 0,
          accountName: ''
        }]
      }
    ])
  }

  const ctxVal = {
    journalEntries,
    createNewJournalEntry,
    deleteJournalEntry
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
