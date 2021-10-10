import React from 'react'

import {
  EntryLineItemWithEntryNumber
} from '@typings'

import { GeneralLedger } from '@components/GeneralLedger/GeneralLedger'
import { TAccount } from '@components/TAccount/TAccount'

import { useJournalDataContext } from '@providers/JournalDataProvider'

import './JournalScreen.scss'

type TAccountDataMap = { [accountName: string]: EntryLineItemWithEntryNumber[] }

export const JournalScreen: React.FC = () => {
  const { journalEntries } = useJournalDataContext()

  const allAccountsMap: TAccountDataMap = {}

  journalEntries.forEach(je => {
    const { debits, credits, entryNumber } = je

    const lineItems = [...debits, ...credits]
    lineItems.forEach(lineItem => {
      allAccountsMap[lineItem.accountName] = allAccountsMap[lineItem.accountName] ?? []
      // we only add in entryNumber for supplemental data purposes (UI needs it)
      allAccountsMap[lineItem.accountName].push({
        ...lineItem, entryNumber
      })
    })
  })

  return (
    <div className="screen-container">
      <h2>General Ledger</h2>
      <div className='general-ledger-section'>
        <GeneralLedger />
      </div>
      <hr />
      <h2>T-Accounts</h2>
      <div className='t-accounts-section'>
        {
          Object.entries(allAccountsMap).map(([accountName, entryLineItems], idx) => {
            return <TAccount
              accountName={accountName}
              lineItems={entryLineItems}
              key={idx}
            />
          })
        }
      </div>
    </div>
  )
}
