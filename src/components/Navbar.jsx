import React from 'react'
import { navlinks } from '../constants'

const Navbar = () => {
  return (
    <>
      <header>
          <nav className="navbar">
            <img src="/logo.svg" alt="apple logo" />
            <ul>
              {navlinks.map(({label})=>(<li key ={label}> <a href={label}>{label}</a></li>))}
            </ul>
            <div>
              <button>
                <img src="/search.svg" alt="search icon" />
              </button>
              <button>
                <img src="/cart.svg" alt="bag icon" />
              </button>
            </div>

          </nav>
      </header>
    
    </>
  )
}

export default Navbar