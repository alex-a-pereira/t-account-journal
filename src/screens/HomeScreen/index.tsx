import React from 'react'

import {
  EntryLineItem
} from '@typings'

import { GeneralLedger } from '@components/GeneralLedger/GeneralLedger'
import { TAccount } from '@components/TAccount/TAccount'

import { dataStore } from '@store'

import './HomeScreen.scss'

type TAccountDataMap = { [accountName: string]: EntryLineItem[] }

export const HomeScreen: React.FC = () => {
  const allAccountsMap: TAccountDataMap = {}

  dataStore.journalEntries.forEach(je => {
    const { debits, credits } = je

    const lineItems = [...debits, ...credits]
    lineItems.forEach(li => {
      allAccountsMap[li.accountName] = allAccountsMap[li.accountName] ?? []
      allAccountsMap[li.accountName].push(li)
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
