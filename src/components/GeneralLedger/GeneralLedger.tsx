import React, { PropsWithChildren } from 'react'

import {
  JournalEntry,
  EntryLineItem,
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
  entryLineItem: EntryLineItem
}>

const EntryNumberColumn: React.FC<EntryNumberColumnProps> = (props: EntryNumberColumnProps) => {
  const { deleteJournalEntry } = useJournalDataContext()

  const {
    idx, entryLineItem
  } = props

  return idx !== 0
    ? <td />
    : (
      <td>
        {entryLineItem.entryNumber}
        <button
          onClick={() => deleteJournalEntry(entryLineItem.entryNumber)}
          style={{ marginLeft: 6 }}
        >
          del
        </button>
      </td>
      )
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props: JournalEntryDisplayProps) => {
  const { updateEntryLineItem } = useJournalDataContext()

  const { entry } = props

  const entryLineItems = [...entry.debits, ...entry.credits]

  // const updateEntryLineItem = (field: string, newValue: JournalInputValue) => {
  //   console.log(`changing ${field} to ${newValue}`)
  // }

  return (
    <>
      {entryLineItems.map((entryLineItem, idx) => {
        const isEven = idx % 2 === 0

        return (
          <tr className={`entry-row ${isEven ? 'dark' : ''}`} key={idx}>
            {/* TODO: hacky as hell lol */}
            <EntryNumberColumn
              idx={idx}
              entryLineItem={entryLineItem}
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
                      updateEntryLineItem(entryLineItem.id, { accountName: value })
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
                      updateEntryLineItem(entryLineItem.id, { accountName: value })
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
                      updateEntryLineItem(entryLineItem.id, { amount: parseFloat(value as string) })
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
                      // TODO: fix typing on this
                      updateEntryLineItem(entryLineItem.id, { amount: parseFloat(value as string) })
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
