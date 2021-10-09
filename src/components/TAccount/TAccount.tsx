import React from 'react'

import {
  EntryType,
  EntryLineItem
} from '@typings'

import './TAccount.scss'

interface TAccountEntryProps {
  isEven: boolean
  entryLineItem: EntryLineItem
}

const TAccountEntry: React.FC<TAccountEntryProps> = (props: TAccountEntryProps) => {
  const { type, amount, entryNumber } = props.entryLineItem

  return (
    <tr className={`entry ${!props.isEven ? 'dark' : ''}`}>
      <td className='id'>{entryNumber}</td>
      <td className='column'>{type === EntryType.debit ? amount : null}</td>
      <td className='column'>{type === EntryType.credit ? amount : null}</td>
    </tr>
  )
}

interface TAccountProps {
  lineItems: EntryLineItem[],
  accountName: string
}

export const TAccount: React.FC<TAccountProps> = (props: TAccountProps) => {
  const {
    lineItems, accountName
  } = props

  return (
    <div className="t-account-container">
      <div className="header">
        <h3 className="title">{accountName}</h3>
      </div>

      <div className='body'>
        <table>
          {
            lineItems.map((li, idx) => {
              return (
                <TAccountEntry
                  key={idx}
                  isEven={idx % 2 === 0}
                  entryLineItem={li}
                />
              )
            })
          }
        </table>
      </div>
    </div>
  )
}
