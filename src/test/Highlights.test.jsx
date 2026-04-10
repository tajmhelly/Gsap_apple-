import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock GSAP and its React integration
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    to: vi.fn(),
  },
}))

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: {},
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn((fn) => fn()),
}))

// Mock react-responsive
vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(() => false),
}))

import Highlights from '../components/Highlights.jsx'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

describe('Highlights', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useMediaQuery.mockReturnValue(false)
    useGSAP.mockImplementation((fn) => fn())
  })

  describe('section structure', () => {
    it('renders the section with id="highlights"', () => {
      render(<Highlights />)
      const section = document.querySelector('#highlights')
      expect(section).toBeInTheDocument()
    })

    it('renders the main heading', () => {
      render(<Highlights />)
      expect(
        screen.getByText("There's never been a better time to upgrade.")
      ).toBeInTheDocument()
    })

    it('renders the subheading', () => {
      render(<Highlights />)
      expect(
        screen.getByText('Here is what yo get with the new Macbook Pro.')
      ).toBeInTheDocument()
    })

    it('renders the masonry layout container', () => {
      render(<Highlights />)
      const masonry = document.querySelector('.masonry')
      expect(masonry).toBeInTheDocument()
    })
  })

  describe('left column content', () => {
    it('renders the left-column div', () => {
      render(<Highlights />)
      const leftColumn = document.querySelector('.left-column')
      expect(leftColumn).toBeInTheDocument()
    })

    it('renders the laptop image', () => {
      render(<Highlights />)
      const laptopImg = screen.getByAltText('laptop')
      expect(laptopImg).toBeInTheDocument()
      expect(laptopImg).toHaveAttribute('src', '/laptop.png')
    })

    it('renders the performance text', () => {
      render(<Highlights />)
      expect(screen.getByText(/Fly through demanding tasks up to 9\.8x faster/i)).toBeInTheDocument()
    })

    it('renders the sun image', () => {
      render(<Highlights />)
      const sunImg = screen.getByAltText('sun')
      expect(sunImg).toBeInTheDocument()
      expect(sunImg).toHaveAttribute('src', '/sun.png')
    })

    it('renders the Liquid Retina XDR display text', () => {
      render(<Highlights />)
      expect(screen.getByText(/Liquid Retina XDR/i)).toBeInTheDocument()
    })
  })

  describe('right column content', () => {
    it('renders the right-column div', () => {
      render(<Highlights />)
      const rightColumn = document.querySelector('.right-column')
      expect(rightColumn).toBeInTheDocument()
    })

    it('renders the ai image', () => {
      render(<Highlights />)
      const aiImg = screen.getByAltText('ai')
      expect(aiImg).toBeInTheDocument()
      expect(aiImg).toHaveAttribute('src', '/ai.png')
    })

    it('renders the Apple Intelligence text', () => {
      render(<Highlights />)
      expect(screen.getByText(/Apple Intelligence/i)).toBeInTheDocument()
    })

    it('renders the battery image', () => {
      render(<Highlights />)
      const batteryImg = screen.getByAltText('Battery')
      expect(batteryImg).toBeInTheDocument()
      expect(batteryImg).toHaveAttribute('src', '/battery.png')
    })

    it('renders the battery life text', () => {
      render(<Highlights />)
      expect(screen.getByText(/14 more hours/i)).toBeInTheDocument()
    })

    it('renders the M4 Max battery hours text', () => {
      render(<Highlights />)
      expect(screen.getByText(/Up to 22 hours on the M4 Max/i)).toBeInTheDocument()
    })
  })

  describe('GSAP animation integration', () => {
    it('calls useGSAP with isMobile as a dependency', () => {
      render(<Highlights />)
      expect(useGSAP).toHaveBeenCalled()
    })

    it('calls gsap.to for animation on desktop', () => {
      useMediaQuery.mockReturnValue(false)
      render(<Highlights />)
      expect(gsap.to).toHaveBeenCalledWith(
        '.left-column, .right-column',
        expect.objectContaining({
          y: 0,
          opacity: 1,
          ease: 'power1.inOut',
          duration: 1,
          stagger: 0.5,
        })
      )
    })

    it('uses "top center" scrollTrigger start on desktop', () => {
      useMediaQuery.mockReturnValue(false)
      render(<Highlights />)
      expect(gsap.to).toHaveBeenCalledWith(
        '.left-column, .right-column',
        expect.objectContaining({
          scrollTrigger: expect.objectContaining({
            trigger: '#highlights',
            start: 'top center',
          }),
        })
      )
    })

    it('uses "bottom bottom" scrollTrigger start on mobile', () => {
      useMediaQuery.mockReturnValue(true)
      render(<Highlights />)
      expect(gsap.to).toHaveBeenCalledWith(
        '.left-column, .right-column',
        expect.objectContaining({
          scrollTrigger: expect.objectContaining({
            trigger: '#highlights',
            start: 'bottom bottom',
          }),
        })
      )
    })
  })

  describe('responsive behavior', () => {
    it('renders correctly when isMobile is true', () => {
      useMediaQuery.mockReturnValue(true)
      render(<Highlights />)
      expect(screen.getByText("There's never been a better time to upgrade.")).toBeInTheDocument()
      // All content still present on mobile
      expect(screen.getByAltText('laptop')).toBeInTheDocument()
      expect(screen.getByAltText('Battery')).toBeInTheDocument()
    })

    it('renders correctly when isMobile is false', () => {
      useMediaQuery.mockReturnValue(false)
      render(<Highlights />)
      expect(screen.getByText("There's never been a better time to upgrade.")).toBeInTheDocument()
    })
  })
})