import React from 'react'

import {
  JournalEntry
} from '@typings'

import { useJournalDataContext } from '@providers/JournalDataProvider'

import './GeneralLedger.scss'

interface JournalEntryDisplayProps {
  entryNumber: number
  entry: JournalEntry
}

interface RowDisplayData {
  entryNumber: number | null
  debitAccountName: string | null
  debitAmount: number | null
  creditAccountName: string | null
  creditAmount: number | null
}

const JournalEntryDisplay: React.FC<JournalEntryDisplayProps> = (props: JournalEntryDisplayProps) => {
  const { entry } = props

  const rowDatas: RowDisplayData[] = []

  entry.debits.forEach((dr, idx) => {
    rowDatas.push({
      entryNumber: idx === 0 ? dr.entryNumber : null,
      debitAccountName: dr.accountName,
      debitAmount: dr.amount,
      creditAccountName: null,
      creditAmount: null
    })
  })

  entry.credits.forEach(cr => {
    rowDatas.push({
      entryNumber: null,
      debitAccountName: null,
      debitAmount: null,
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
  const { journalEntries } = useJournalDataContext()

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
    </div>
  )
}
