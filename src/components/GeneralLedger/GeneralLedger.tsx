import React from 'react'

import {
  EntryType,
  JournalEntry
} from '@typings'

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

// TODO: just a stub right now
const getEntryNum = () => {
  return Math.round(Math.random() * 100) * 2
}

export const GeneralLedger: React.FC = () => {
  const num = getEntryNum()
  // clearly this is stubbed tf out
  const entries: JournalEntry[] = [
    {
      entryNumber: num,
      debits: [
        { type: EntryType.debit, entryNumber: num, amount: 1000 }
      ],
      credits: [
        { type: EntryType.credit, entryNumber: num, amount: 800 },
        { type: EntryType.credit, entryNumber: num, amount: 100 },
        { type: EntryType.credit, entryNumber: num, amount: 100 }
      ]
    }
  ].sort((a, b) => a.entryNumber - b.entryNumber)

  return (
    <div>
      <table className='gen-ledger-table'>
        {
          entries.map((entry, idx) => {
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
