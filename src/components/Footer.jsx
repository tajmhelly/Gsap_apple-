import React from 'react'
import { footerLinks } from '../constants'

const Footer = () => {
  return (
    <>
      <footer>
        <div className='info'>
          <p>More ways to shop: <span>Find an Apple Store</span> or <span>other retailer</span> near you. Or call 1-800-MY-APPLE.</p>
          <img src="/logo.svg" alt="apple logo" />
        </div>
        <hr />
        <div className='links'>
          <p>Copyright © 2026 Apple Inc. All rights reserved.</p>
          <ul>
            {footerLinks.map(({label, link})=>(<li key ={label}> <a href={link}>{label}</a></li>))}
          </ul>
          
        </div>
      </footer>
    </>
  )
}

export default Footer