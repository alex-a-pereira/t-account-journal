import React from 'react'

import {
  JournalEntry,
  JournalInputValue
} from '@typings'

import { useJournalDataContext } from '@providers/JournalDataProvider'

// UI components
import {
  CellInput
} from '@components/CellInput/CellInput'

import './GeneralLedger.scss'

interface JournalEntryDisplayProps {
  entryNumber: number
  entry: JournalEntry
}

interface RowDisplayData {
  entryNumber: number | null
  debitAccountName: JournalInputValue
  debitAmount: JournalInputValue
  creditAccountName: JournalInputValue
  creditAmount: JournalInputValue
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

  const updateEntryLineItem = (field: string, newValue: JournalInputValue) => {
    console.log(`changing ${field} to ${newValue}`)
  }

  return (
    <>
      {rowDatas.map((rd, idx) => {
        const isEven = idx % 2 === 0

        return (
          <tr className={`entry-row ${isEven ? 'dark' : ''}`} key={idx}>
            <td>{rd.entryNumber}</td>
            {/* NAMES - only one should be non-null */}
            <CellInput
              initialValue={rd.debitAccountName}
              isEditable={rd.debitAccountName !== undefined}
              onChange={(value) => {
                updateEntryLineItem('debitAccountName', value)
              }}
            />
            <CellInput
              initialValue={rd.creditAccountName}
              isEditable={rd.creditAccountName !== undefined}
              onChange={(value) => {
                updateEntryLineItem('creditAccountName', value)
              }}
            />
            {/* AMOUNTS - only one should be non-null */}
            <CellInput
              initialValue={rd.debitAmount}
              isEditable={rd.debitAmount !== undefined}
              onChange={(value) => {
                updateEntryLineItem('creditAmount', value)
              }}
            />
            <CellInput
              initialValue={rd.creditAmount}
              isEditable={rd.creditAmount !== undefined}
              onChange={(value) => {
                updateEntryLineItem('creditAmount', value)
              }}
            />
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
