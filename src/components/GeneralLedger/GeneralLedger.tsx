import React, { PropsWithChildren } from 'react'

import {
  JournalEntry,
  JournalEntryNumber,
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

type EntryNumberColumnProps = PropsWithChildren<{
  idx: number
  entryNumberToDel: JournalEntryNumber
}>

const EntryNumberColumn: React.FC<EntryNumberColumnProps> = (props: EntryNumberColumnProps) => {
  const { deleteJournalEntry } = useJournalDataContext()

  const {
    idx, entryNumberToDel
  } = props

  return idx !== 0
    ? <td />
    : (
      <td>
        {entryNumberToDel}
        <button
          onClick={() => deleteJournalEntry(entryNumberToDel)}
          style={{ marginLeft: 6 }}
        >
          del
        </button>
      </td>
      )
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props: JournalEntryDisplayProps) => {
  const { entry } = props

  const rowDatas: RowDisplayData[] = []

  entry.debits.forEach((dr, idx) => {
    rowDatas.push({
      // only show entry number on first debit
      entryNumber: idx === 0 ? entry.entryNumber : null,
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
            {/* TODO: hacky as hell lol */}
            <EntryNumberColumn
              idx={idx}
              entryNumberToDel={entry.entryNumber}
            />
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
        <tbody>
          {journalEntries.map((entry, idx) => {
            return (
              <JournalEntryDisplay
                key={idx}
                entry={entry}
                entryNumber={entry.entryNumber}
              />
            )
          })}
        </tbody>
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
