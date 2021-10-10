import React from 'react'
// nav
import { useHistory } from 'react-router-dom'
import { routes } from '@setup/Router/routes'
// styles
import './SiteHeader.scss'

export const SiteHeader: React.FC = () => {
  const history = useHistory()

  return (
    <div className='header-container'>
      <div className='site-name-container'>
        <h2 onClick={() => history.push(routes.home())}>SITE NAME</h2>
      </div>

      <div className='main-items-container'>
        <p>about us</p>
        <p>how to use</p>
        <p>something</p>
      </div>

      <div className='stuff-on-right'>
        <p>anything else</p>
      </div>
    </div>
  )
}
