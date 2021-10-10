import React from 'react'

import { Link } from 'react-router-dom'
import { routes } from '@setup/Router/routes'

import './HomeScreen.scss'

export const HomeScreen: React.FC = () => {
  return (
    <div className='screen-container'>
      <Link to={routes.journal('new')}>
        Create a new journal
      </Link>
    </div>
  )
}
