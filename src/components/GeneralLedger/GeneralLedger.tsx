import React, { PropsWithChildren } from 'react'

import {
  JournalEntry,
  JournalEntryNumber,
  JournalInputValue,
  EntryType
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

  const entryLineItems = [...entry.debits, ...entry.credits]

  const updateEntryLineItem = (field: string, newValue: JournalInputValue) => {
    console.log(`changing ${field} to ${newValue}`)
  }

  return (
    <>
      {entryLineItems.map((entryLineItem, idx) => {
        const isEven = idx % 2 === 0

        return (
          <tr className={`entry-row ${isEven ? 'dark' : ''}`} key={idx}>
            {/* TODO: hacky as hell lol */}
            <EntryNumberColumn
              idx={idx}
              entryNumberToDel={entry.entryNumber}
            />
            {/* NAMES - only one should be non-null */}
            {
              entryLineItem.type !== EntryType.debit
                ? <td />
                : (
                  <CellInput
                    initialValue={entryLineItem.accountName}
                    isEditable={entryLineItem.accountName !== undefined}
                    onChange={(value) => {
                      updateEntryLineItem('debitAccountName', value)
                    }}
                  />
                  )
            }
            {
              entryLineItem.type !== EntryType.credit
                ? <td />
                : (
                  <CellInput
                    initialValue={entryLineItem.accountName}
                    isEditable={entryLineItem.accountName !== undefined}
                    onChange={(value) => {
                      updateEntryLineItem('creditAccountName', value)
                    }}
                  />
                  )
            }
            {/* AMOUNTS - only one should be non-null */}
            {
              entryLineItem.type !== EntryType.debit
                ? <td />
                : (
                  <CellInput
                    initialValue={entryLineItem.amount}
                    isEditable={entryLineItem.amount !== undefined}
                    onChange={(value) => {
                      updateEntryLineItem('debitAmount', value)
                    }}
                  />
                  )
            }
            {
              entryLineItem.type !== EntryType.credit
                ? <td />
                : (
                  <CellInput
                    initialValue={entryLineItem.amount}
                    isEditable={entryLineItem.amount !== undefined}
                    onChange={(value) => {
                      updateEntryLineItem('creditAmount', value)
                    }}
                  />
                  )
            }
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
