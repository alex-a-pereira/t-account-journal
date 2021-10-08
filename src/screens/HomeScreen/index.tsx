import React from 'react'

import { GeneralLedger } from '@components/GeneralLedger/GeneralLedger'
import { TAccount } from '@components/TAccount/TAccount'

import './HomeScreen.scss'

export const HomeScreen: React.FC = () => {
  return (
    <div className="screen-container">
      <h2>General Ledger</h2>
      <div className='general-ledger-section'>
        <GeneralLedger />
      </div>
      <hr />
      <h2>T-Accounts</h2>
      <div className='t-accounts-section'>
        <TAccount />
        <TAccount />
        <TAccount />
        <TAccount />
        <TAccount />
        <TAccount />
        <TAccount />
        <TAccount />
      </div>
    </div>
  )
}
