import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Footer from '../components/Footer.jsx'

describe('Footer', () => {
  describe('info section', () => {
    it('renders the shopping info text', () => {
      render(<Footer />)
      expect(screen.getByText(/More ways to shop/i)).toBeInTheDocument()
    })

    it('renders "Find an Apple Store" as a span', () => {
      render(<Footer />)
      expect(screen.getByText('Find an Apple Store')).toBeInTheDocument()
    })

    it('renders "other retailer" text', () => {
      render(<Footer />)
      expect(screen.getByText('other retailer')).toBeInTheDocument()
    })

    it('renders the Apple phone number', () => {
      render(<Footer />)
      expect(screen.getByText(/1-800-MY-APPLE/i)).toBeInTheDocument()
    })

    it('renders the Apple logo image', () => {
      render(<Footer />)
      const logo = screen.getByAltText('apple logo')
      expect(logo).toBeInTheDocument()
      expect(logo).toHaveAttribute('src', '/logo.svg')
    })
  })

  describe('links section', () => {
    it('renders copyright text with current year', () => {
      render(<Footer />)
      expect(screen.getByText(/Copyright © 2026 Apple Inc\. All rights reserved\./i)).toBeInTheDocument()
    })

    it('renders all footer links', () => {
      render(<Footer />)
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
      expect(screen.getByText('Terms of Use')).toBeInTheDocument()
      expect(screen.getByText('Sales Policy')).toBeInTheDocument()
      expect(screen.getByText('Legal')).toBeInTheDocument()
      expect(screen.getByText('Site Map')).toBeInTheDocument()
    })

    it('renders footer links as anchor elements', () => {
      render(<Footer />)
      const privacyLink = screen.getByText('Privacy Policy').closest('a')
      expect(privacyLink).toBeInTheDocument()
      expect(privacyLink).toHaveAttribute('href', '#')
    })

    it('renders all links with href attributes', () => {
      render(<Footer />)
      const links = ['Privacy Policy', 'Terms of Use', 'Sales Policy', 'Legal', 'Site Map']
      links.forEach((label) => {
        const anchor = screen.getByText(label).closest('a')
        expect(anchor).toHaveAttribute('href')
      })
    })

    it('renders the correct number of footer links', () => {
      render(<Footer />)
      const listItems = document.querySelectorAll('footer ul li')
      expect(listItems).toHaveLength(5)
    })
  })

  describe('structure', () => {
    it('renders a footer element', () => {
      const { container } = render(<Footer />)
      expect(container.querySelector('footer')).toBeInTheDocument()
    })

    it('renders an hr divider between info and links', () => {
      const { container } = render(<Footer />)
      expect(container.querySelector('hr')).toBeInTheDocument()
    })

    it('renders a ul element for links', () => {
      const { container } = render(<Footer />)
      expect(container.querySelector('ul')).toBeInTheDocument()
    })
  })
})