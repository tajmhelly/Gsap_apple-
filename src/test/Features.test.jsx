import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

// Mock three/tsl (unused import in Features, but present)
vi.mock('three/tsl', () => ({
  cross: vi.fn(),
  texture: null,
}))

// Mock React Three Fiber Canvas
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="r3f-canvas">{children}</div>,
}))

// Mock React Three Drei
vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
  useGLTF: vi.fn(() => ({ nodes: {}, materials: {}, scene: { traverse: vi.fn() } })),
  useVideoTexture: vi.fn(() => null),
}))

// Mock GSAP
vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      call: vi.fn().mockReturnThis(),
    })),
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

// Mock react-dom preload
vi.mock('react-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, preload: vi.fn() }
})

// Mock Studiolight (Three.js lights component)
vi.mock('../components/three/Studiolight.jsx', () => ({
  default: () => null,
}))

// Mock Macbook 3D model
vi.mock('../components/models/Macbook.jsx', () => ({
  default: (props) => <mesh data-testid="macbook-model" />,
}))

// Mock the store
vi.mock('../store/index.js', () => ({
  default: vi.fn(() => ({
    setTexture: vi.fn(),
    color: '#2e2c2e',
    texture: '/videos/feature-1.mp4',
  })),
}))

import Features from '../components/Features.jsx'
import { features } from '../constants/index.js'

describe('Features', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('section structure', () => {
    it('renders the section with id="features"', () => {
      render(<Features />)
      const section = document.querySelector('#features')
      expect(section).toBeInTheDocument()
    })

    it('renders the section heading', () => {
      render(<Features />)
      expect(screen.getByText(/see it all in a new light/i)).toBeInTheDocument()
    })

    it('renders the Canvas element', () => {
      render(<Features />)
      expect(screen.getByTestId('r3f-canvas')).toBeInTheDocument()
    })

    it('renders the features overlay container', () => {
      render(<Features />)
      const overlay = document.querySelector('.absolute.inset-0.z-50')
      expect(overlay).toBeInTheDocument()
    })
  })

  describe('feature boxes', () => {
    it('renders all 5 feature boxes', () => {
      render(<Features />)
      const boxes = document.querySelectorAll('.box')
      expect(boxes).toHaveLength(5)
    })

    it('renders box-1 through box-5 classes', () => {
      render(<Features />)
      for (let i = 1; i <= 5; i++) {
        expect(document.querySelector(`.box-${i}`)).toBeInTheDocument()
      }
    })

    it('renders the Email AI feature highlight', () => {
      render(<Features />)
      expect(screen.getByText('Email AI.')).toBeInTheDocument()
    })

    it('renders the Image AI feature highlight', () => {
      render(<Features />)
      expect(screen.getByText('Image AI.')).toBeInTheDocument()
    })

    it('renders the Summarize AI feature highlight', () => {
      render(<Features />)
      expect(screen.getByText('Summarize AI.')).toBeInTheDocument()
    })

    it('renders the AirDrop feature highlight', () => {
      render(<Features />)
      expect(screen.getByText('AirDrop.')).toBeInTheDocument()
    })

    it('renders the Writing Tool feature highlight', () => {
      render(<Features />)
      expect(screen.getByText('Writing Tool.')).toBeInTheDocument()
    })

    it('renders feature description text for Email AI', () => {
      render(<Features />)
      expect(
        screen.getByText(/Summarize and draft replies to emails instantly/i)
      ).toBeInTheDocument()
    })

    it('renders feature description text for AirDrop', () => {
      render(<Features />)
      expect(
        screen.getByText(/Wirelessly share photos/i)
      ).toBeInTheDocument()
    })
  })

  describe('feature icons', () => {
    it('renders icons for all 5 features', () => {
      render(<Features />)
      const icons = document.querySelectorAll('.box img')
      expect(icons).toHaveLength(5)
    })

    it('renders feature-icon1.svg with correct alt', () => {
      render(<Features />)
      const icon = screen.getByAltText('Email AI.')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('src', '/feature-icon1.svg')
    })

    it('renders feature-icon2.svg with correct alt', () => {
      render(<Features />)
      const icon = screen.getByAltText('Image AI.')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('src', '/feature-icon2.svg')
    })

    it('renders feature-icon5.svg for Writing Tool', () => {
      render(<Features />)
      const icon = screen.getByAltText('Writing Tool.')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('src', '/feature-icon5.svg')
    })
  })

  describe('feature box class construction', () => {
    it('each feature box has the base "box" class', () => {
      render(<Features />)
      features.forEach((feature, index) => {
        const box = document.querySelector(`.box-${index + 1}`)
        expect(box.classList.contains('box')).toBe(true)
      })
    })

    it('feature icons have correct sizing classes', () => {
      render(<Features />)
      const firstIcon = screen.getByAltText('Email AI.')
      expect(firstIcon.classList.contains('w-10')).toBe(true)
      expect(firstIcon.classList.contains('h-10')).toBe(true)
    })

    it('highlight text is wrapped in a text-white span', () => {
      render(<Features />)
      const highlights = document.querySelectorAll('.box .text-white')
      expect(highlights).toHaveLength(5)
    })
  })
})