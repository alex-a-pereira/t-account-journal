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
  deleteJournalEntry: Function,
  updateEntryLineItem: Function
}

const JournalDataContext = React.createContext<JournalData>({
  journalEntries: dataStore.journalEntries,
  createNewJournalEntry: () => {},
  deleteJournalEntry: () => {},
  updateEntryLineItem: () => {}
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

  /**
   * CREATE
   */

  const createNewJournalEntry = () => {
    // make sure new entries have the next ID in line
    const entryNumber = Math.max(...journalEntries.map(je => je.entryNumber)) + 1

    const newDebit = {
      id: Date.now() * Math.random(),
      entryNumber,
      type: EntryType.debit,
      amount: 0,
      accountName: ''
    }

    const newCredit = {
      id: Date.now() * Math.random(),
      entryNumber,
      type: EntryType.credit,
      amount: 0,
      accountName: ''
    }

    setEntryLineItems([...entryLineItems, newDebit, newCredit])
  }

  /**
   * UPDATE
   */

  const updateEntryLineItem = (lineItemId: number, newData: Partial<EntryLineItem>) => {
    const idxOfItemToUpdate = entryLineItems.findIndex(li => li.id === lineItemId)
    if (idxOfItemToUpdate < 0) { return }

    const newFullRecord = {
      ...entryLineItems[idxOfItemToUpdate],
      ...newData
    }

    setEntryLineItems([
      ...entryLineItems.slice(0, idxOfItemToUpdate),
      newFullRecord,
      ...entryLineItems.slice(idxOfItemToUpdate + 1, entryLineItems.length)
    ])
  }

  /**
   * DELETE
   */

  // deletes one single EntryLineItem
  const deleteLineItems = (lineItemIds: number[]) => {
    const newLineItems = entryLineItems
      .filter(li => !lineItemIds.includes(li.id))
    // TODO: fix the auto increment
    setEntryLineItems(newLineItems)
  }

  // deletes every single EntryLineItem for a particular JournalEntry
  const deleteJournalEntry = (entryNumber: JournalEntryNumber) => {
    const journalEntry = journalEntries.find(je => je.entryNumber === entryNumber)
    if (!journalEntry) { return }

    const allEntryLineItems = [...journalEntry.debits, ...journalEntry.credits]
    deleteLineItems(allEntryLineItems.map(eli => eli.id))
  }

  const ctxVal = {
    journalEntries,
    createNewJournalEntry,
    deleteJournalEntry,
    updateEntryLineItem
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
