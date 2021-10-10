import React from 'react'

import {
  JournalEntry,
  JournalInput
} from '@typings'

import { useJournalDataContext } from '@providers/JournalDataProvider'

import './GeneralLedger.scss'

interface JournalEntryDisplayProps {
  entryNumber: number
  entry: JournalEntry
}

interface RowDisplayData {
  entryNumber: number | null
  debitAccountName: JournalInput
  debitAmount: JournalInput
  creditAccountName: JournalInput
  creditAmount: JournalInput
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props: JournalEntryDisplayProps) => {
  const { entry } = props

  const rowDatas: RowDisplayData[] = []

  entry.debits.forEach((dr, idx) => {
    rowDatas.push({
      entryNumber: idx === 0 ? dr.entryNumber : null,
      debitAccountName: dr.accountName,
      debitAmount: dr.amount,
      creditAccountName: undefined,
      creditAmount: undefined
    })
  })

  entry.credits.forEach(cr => {
    rowDatas.push({
      entryNumber: null,
      debitAccountName: undefined,
      debitAmount: undefined,
      creditAccountName: cr.accountName,
      creditAmount: cr.amount
    })
  })

  return (
    <>
      {rowDatas.map((rd, idx) => {
        const isEven = idx % 2 === 0

        return (
          <tr className={`entry-row ${isEven ? 'dark' : ''}`} key={idx}>
            <td>{rd.entryNumber}</td>
            {/* NAMES - only one should be non-null */}
            <td>{rd.debitAccountName}</td>
            <td>{rd.creditAccountName}</td>
            {/* AMOUNTS - only one should be non-null */}
            <td>{rd.debitAmount}</td>
            <td>{rd.creditAmount}</td>
          </tr>
        )
      })}
    </>
  )
}

export const GeneralLedger: React.FC = () => {
  const { journalEntries, createNewJournalEntry } = useJournalDataContext()

  return (
    <div>
      <table className='gen-ledger-table'>
        {
          journalEntries.map((entry, idx) => {
            return (
              <JournalEntryDisplay
                key={idx}
                entry={entry}
                entryNumber={entry.entryNumber}
              />
            )
          })
        }
      </table>
      <button
        onClick={() => {
          createNewJournalEntry()
        }}
      >
        Add Entry
      </button>
    </div>
  )
}
