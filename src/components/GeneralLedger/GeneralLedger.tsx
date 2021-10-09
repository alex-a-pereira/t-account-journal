import React from 'react'

import {
  JournalEntry
} from '@typings'

import { dataStore } from '@store'

import './GeneralLedger.scss'

/**
 * TODO TODO TODO:
 * we need to be able to support multiple debits and multiple credits per journal entry!!
 */

interface JournalEntryDisplayProps {
  entryNumber: number
  entry: JournalEntry
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props: JournalEntryDisplayProps) => {
  const { entry } = props

  /*
    table
      tr
        td debit1, td null
      tr
        td debit2, td null
      tr
        td null, td credit1
      tr
        td null, td credit2
  */

  return (
    <>
      {
        entry.debits.map((debit, idx) => {
          return (
            <tr key={idx}>
              {/* col for entry num, only appears on first debit */}
              <td>{idx === 0 ? debit.entryNumber : null}</td>
              {/* debit col */}
              <td>{debit.amount}</td>
              {/* credit col */}
              <td></td>
            </tr>
          )
        })
      }
      {
        entry.credits.map((credit, idx) => {
          return (
            <tr key={idx}>
              {/* col for entry num, only appears on first debit */}
              <td></td>
              {/* debit col */}
              <td></td>
              {/* credit col */}
              <td>{credit.amount}</td>
            </tr>
          )
        })
      }
    </>
  )
}

export const GeneralLedger: React.FC = () => {
  return (
    <div>
      <table className='gen-ledger-table'>
        {
          dataStore.journalEntries.map((entry, idx) => {
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
    </div>
  )
}
