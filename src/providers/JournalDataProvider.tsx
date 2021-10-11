import React, { useContext, useState } from 'react'

import {
  JournalEntry,
  EntryType,
  JournalEntryNumber,
  EntryLineItem,
  Debit,
  Credit
} from '@typings'

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

const lineItemsToJournalEntryArr = (entryLineItems: EntryLineItem[]): JournalEntry[] => {
  const ret: JournalEntry[] = []

  const allEntryNumbers = new Set<JournalEntryNumber>(
    entryLineItems.map(lineItem => lineItem.entryNumber)
  )

  allEntryNumbers.forEach(entryNum => {
    const lineItemsForEntry = entryLineItems.filter(lineItem => {
      return lineItem.entryNumber === entryNum
    })

    const debitsForEntry = lineItemsForEntry.filter(li => li.type === EntryType.debit)
    const creditsForEntry = lineItemsForEntry.filter(li => li.type === EntryType.credit)

    ret.push({
      entryNumber: entryNum,
      // TODO: is this okay?
      debits: debitsForEntry as Debit[],
      credits: creditsForEntry as Credit[]
    })
  })

  return ret
}

export const JournalDataProvider: React.FC = ({ children }) => {
  // eslint-disable-next-line
  const [entryLineItems, setEntryLineItems] = useState(dataStore.entryLineItems)
  // easier access for consumers
  const journalEntries = lineItemsToJournalEntryArr(entryLineItems)

  const deleteJournalEntry = (entryNumber: JournalEntryNumber) => {
    console.log(entryNumber)
    // const idxToRemove = journalEntries.findIndex(je => je.entryNumber === entryNumber)
    // const newJournalEntries = [
    //   ...journalEntries.slice(0, idxToRemove),
    //   ...journalEntries.slice(idxToRemove + 1, journalEntries.length)
    // ].map((je, idx) => {
    //   // re-indexes all the JournalEntry.entryNumber from 0, as deleting would mess up ordering
    //   return { ...je, entryNumber: idx }
    // })

    // setJournalEntries(newJournalEntries)
  }

  const createNewJournalEntry = () => {
    // auo increments
    // const entryNumber = journalEntries.length
    // setJournalEntries([
    //   ...journalEntries,
    //   {
    //     entryNumber,
    //     debits: [{
    //       id: Date.now() * Math.random(),
    //       type: EntryType.debit,
    //       amount: 0,
    //       accountName: ''
    //     }],
    //     credits: [{
    //       id: Date.now() * Math.random(),
    //       type: EntryType.credit,
    //       amount: 0,
    //       accountName: ''
    //     }]
    //   }
    // ])
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
