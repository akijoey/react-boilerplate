import React, { ReactElement } from 'react'

import logo from '@/assets/logo.svg'

import './logo.scss'

const Logo = (): ReactElement => {
  return (
    <div className="logo">
      <img src={logo} alt="logo" />
      <a href="https://reactjs.org">React</a>
    </div>
  )
}

export default Logo
