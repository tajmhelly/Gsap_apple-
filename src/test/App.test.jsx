import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock CSS import
vi.mock('../index.css', () => ({}))

// Mock GSAP
vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
  },
}))
vi.mock('gsap/all', () => ({
  ScrollTrigger: {},
}))

// Mock all child components so we can test App composition in isolation
vi.mock('../components/Navbar', () => ({
  default: () => <nav data-testid="navbar">Navbar</nav>,
}))
vi.mock('../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero</div>,
}))
vi.mock('../components/Productviewer', () => ({
  default: () => <div data-testid="productviewer">Productviewer</div>,
}))
vi.mock('../components/ShowCase', () => ({
  default: () => <div data-testid="showcase">ShowCase</div>,
}))
vi.mock('../components/Performance', () => ({
  default: () => <div data-testid="performance">Performance</div>,
}))
vi.mock('../components/Features', () => ({
  default: () => <div data-testid="features">Features</div>,
}))
vi.mock('../components/Highlights', () => ({
  default: () => <div data-testid="highlights">Highlights</div>,
}))
vi.mock('../components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}))

import App from '../App.jsx'

describe('App', () => {
  describe('renders all sections (new components added in this PR)', () => {
    it('renders Performance component', () => {
      render(<App />)
      expect(screen.getByTestId('performance')).toBeInTheDocument()
    })

    it('renders Features component', () => {
      render(<App />)
      expect(screen.getByTestId('features')).toBeInTheDocument()
    })

    it('renders Highlights component', () => {
      render(<App />)
      expect(screen.getByTestId('highlights')).toBeInTheDocument()
    })

    it('renders Footer component', () => {
      render(<App />)
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })
  })

  describe('renders pre-existing sections', () => {
    it('renders Navbar component', () => {
      render(<App />)
      expect(screen.getByTestId('navbar')).toBeInTheDocument()
    })

    it('renders Hero component', () => {
      render(<App />)
      expect(screen.getByTestId('hero')).toBeInTheDocument()
    })

    it('renders Productviewer component', () => {
      render(<App />)
      expect(screen.getByTestId('productviewer')).toBeInTheDocument()
    })

    it('renders ShowCase component', () => {
      render(<App />)
      expect(screen.getByTestId('showcase')).toBeInTheDocument()
    })
  })

  describe('layout structure', () => {
    it('wraps all components in a main element', () => {
      const { container } = render(<App />)
      expect(container.querySelector('main')).toBeInTheDocument()
    })

    it('renders all 8 sections inside main', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      // All 8 test IDs should be descendants of main
      const testIds = ['navbar', 'hero', 'productviewer', 'showcase', 'performance', 'features', 'highlights', 'footer']
      testIds.forEach((id) => {
        expect(main.querySelector(`[data-testid="${id}"]`)).toBeInTheDocument()
      })
    })

    it('renders components in the correct order', () => {
      const { container } = render(<App />)
      const main = container.querySelector('main')
      const children = Array.from(main.children).map((el) => el.dataset.testid)
      const expectedOrder = ['navbar', 'hero', 'productviewer', 'showcase', 'performance', 'features', 'highlights', 'footer']
      expect(children).toEqual(expectedOrder)
    })
  })
})