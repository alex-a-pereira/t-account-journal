import React from 'react'

import {
  EntryType,
  EntryLineItemWithEntryNumber
} from '@typings'

import './TAccount.scss'

interface TAccountEntryProps {
  isEven: boolean
  entryLineItem: EntryLineItemWithEntryNumber
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
  lineItems: EntryLineItemWithEntryNumber[],
  accountName: string
}

export const TAccount: React.FC<TAccountProps> = (props: TAccountProps) => {
  const {
    lineItems, accountName
  } = props

  const endingBalance = lineItems.reduce((acc, item) => {
    return acc + item.amount * (item.type === EntryType.debit ? 1 : -1)
  }, 0)

  const endingBalanceRounded = Math.round((endingBalance + Number.EPSILON) * 100) / 100

  return (
    <div className="t-account-container">
      <div className="header">
        <h3 className="title">{accountName}</h3>
      </div>

      <div className='body'>
        <table>
          <tbody>
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
            <tr className='t-account-total'>
              <td className='ending-bal-text'>bal</td>
              <td className='column'>{endingBalanceRounded >= 0 ? endingBalanceRounded : null}</td>
              <td className='column'>{endingBalanceRounded < 0 ? endingBalanceRounded * -1 : null}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
