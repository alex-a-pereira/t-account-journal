import React from 'react'

import {
  EntryType, JournalEntry
} from '@typings'

import './TAccount.scss'

interface TAccountEntryProps {
  isEven: boolean
  journalEntry: JournalEntry
}

const TAccountEntry: React.FC<TAccountEntryProps> = (props: TAccountEntryProps) => {
  const { type, amount, entryNumber } = props.journalEntry

  return (
    <tr className={`entry ${!props.isEven ? 'dark' : ''}`}>
      <td className='id'>{entryNumber}</td>
      <td className='column'>{type === EntryType.debit ? amount : null}</td>
      <td className='column'>{type === EntryType.credit ? amount : null}</td>
    </tr>
  )
}

// TODO: just a stub right now
const getEntryNum = () => {
  return Math.round(Math.random() * 100) * 2
}

export const TAccount: React.FC = () => {
  // TODO: obviously stubbed out
  const entries: JournalEntry[] = [
    { type: EntryType.debit, amount: 100, entryNumber: getEntryNum() },
    { type: EntryType.debit, amount: 400, entryNumber: getEntryNum() },
    { type: EntryType.debit, amount: 300, entryNumber: getEntryNum() },
    { type: EntryType.credit, amount: 1200, entryNumber: getEntryNum() },
    { type: EntryType.credit, amount: 50, entryNumber: getEntryNum() }
  ].sort((a, b) => a.entryNumber - b.entryNumber)

  return (
    <div className="t-account-container">
      <div className="header">
        <h3 className="title">Account Name</h3>
      </div>

      <div className='body'>
        <table>
          {
            entries.map((entry, idx) => {
              return (
                <TAccountEntry
                  key={idx}
                  isEven={idx % 2 === 0}
                  journalEntry={entry}
                />
              )
            })
          }
        </table>
      </div>
    </div>
  )
}
