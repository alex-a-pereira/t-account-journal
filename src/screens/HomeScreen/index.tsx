import React from 'react'

import { TAccount } from '@components/TAccount/TAccount'

import './HomeScreen.scss'

export const HomeScreen: React.FC = () => {
  return (
    <div className="screen-container">
      <TAccount />
    </div>
  )
}
