import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock GSAP and its React integration
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
    })),
  },
}))

vi.mock('@gsap/react', () => ({
  useGSAP: vi.fn(),
}))

// Mock react-responsive
vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(() => false),
}))

import Performance from '../components/Performance.jsx'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

describe('Performance', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useMediaQuery.mockReturnValue(false)
    useGSAP.mockImplementation(() => {})
    gsap.timeline.mockReturnValue({ to: vi.fn().mockReturnThis() })
  })

  describe('section structure', () => {
    it('renders a section with id="performance"', () => {
      render(<Performance />)
      const section = document.querySelector('#performance')
      expect(section).toBeInTheDocument()
    })

    it('renders the main heading', () => {
      render(<Performance />)
      expect(
        screen.getByText('Next-level graphics performance. Game on.')
      ).toBeInTheDocument()
    })

    it('renders the wrapper div for images', () => {
      render(<Performance />)
      const wrapper = document.querySelector('.wrapper')
      expect(wrapper).toBeInTheDocument()
    })

    it('renders the content div for the paragraph', () => {
      render(<Performance />)
      const content = document.querySelector('.content')
      expect(content).toBeInTheDocument()
    })
  })

  describe('performance images', () => {
    it('renders all 7 performance images', () => {
      render(<Performance />)
      // 7 images defined in constants
      const images = document.querySelectorAll('.wrapper img')
      expect(images).toHaveLength(7)
    })

    it('renders p1 image with correct src', () => {
      render(<Performance />)
      const p1 = document.querySelector('.p1')
      expect(p1).toBeInTheDocument()
      expect(p1).toHaveAttribute('src', '/performance1.png')
    })

    it('renders p5 image (the jpg)', () => {
      render(<Performance />)
      const p5 = document.querySelector('.p5')
      expect(p5).toBeInTheDocument()
      expect(p5).toHaveAttribute('src', '/performance5.jpg')
    })

    it('renders p6 image with correct src', () => {
      render(<Performance />)
      const p6 = document.querySelector('.p6')
      expect(p6).toBeInTheDocument()
      expect(p6).toHaveAttribute('src', '/performance6.png')
    })

    it('renders p7 image with correct src', () => {
      render(<Performance />)
      const p7 = document.querySelector('.p7')
      expect(p7).toBeInTheDocument()
      expect(p7).toHaveAttribute('src', '/performance7.png')
    })

    it('assigns class names from the id field of each image config', () => {
      render(<Performance />)
      const ids = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7']
      ids.forEach((id) => {
        expect(document.querySelector(`.${id}`)).toBeInTheDocument()
      })
    })

    it('renders a fallback alt text for images without alt field', () => {
      render(<Performance />)
      // Images in constants don't have alt field, so alt falls back to "Performance Image #N"
      expect(screen.getByAltText('Performance Image #1')).toBeInTheDocument()
    })
  })

  describe('content paragraph', () => {
    it('renders the GPU description text', () => {
      render(<Performance />)
      expect(screen.getByText(/M4 family of chips/i)).toBeInTheDocument()
    })

    it('renders the ray tracing text', () => {
      render(<Performance />)
      expect(screen.getByText(/hardware-accelerated ray tracing/i)).toBeInTheDocument()
    })

    it('renders the highlighted gaming text', () => {
      render(<Performance />)
      const highlight = document.querySelector('.content .text-white')
      expect(highlight).toBeInTheDocument()
      expect(highlight.textContent).toMatch(/gaming feels more immersive/i)
    })

    it('renders the Dynamic Caching text', () => {
      render(<Performance />)
      expect(screen.getByText(/Dynamic Caching/i)).toBeInTheDocument()
    })
  })

  describe('GSAP animation integration', () => {
    it('calls useGSAP hook', () => {
      render(<Performance />)
      expect(useGSAP).toHaveBeenCalled()
    })

    it('passes isMobile as a dependency to useGSAP', () => {
      render(<Performance />)
      expect(useGSAP).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ dependencies: [false] })
      )
    })

    it('passes the animation callback function to useGSAP', () => {
      render(<Performance />)
      expect(useGSAP).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Object)
      )
    })

    it('passes isMobile in the dependencies array to useGSAP', () => {
      useMediaQuery.mockReturnValue(false)
      render(<Performance />)
      const [, opts] = useGSAP.mock.calls[0]
      expect(opts.dependencies).toEqual([false])
    })

    it('passes isMobile=true in dependencies on mobile viewport', () => {
      useMediaQuery.mockReturnValue(true)
      render(<Performance />)
      const [, opts] = useGSAP.mock.calls[0]
      expect(opts.dependencies).toEqual([true])
    })
  })

  describe('responsive behavior', () => {
    it('renders all content on mobile', () => {
      useMediaQuery.mockReturnValue(true)
      render(<Performance />)
      expect(screen.getByText('Next-level graphics performance. Game on.')).toBeInTheDocument()
      expect(document.querySelectorAll('.wrapper img')).toHaveLength(7)
    })

    it('renders all content on desktop', () => {
      useMediaQuery.mockReturnValue(false)
      render(<Performance />)
      expect(screen.getByText('Next-level graphics performance. Game on.')).toBeInTheDocument()
      expect(document.querySelectorAll('.wrapper img')).toHaveLength(7)
    })
  })
})