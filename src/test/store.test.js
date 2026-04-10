import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock three/tsl since it's imported but not functionally used in the store
vi.mock('three/tsl', () => ({
  texture: null,
}))

// Import after mocks
const { default: useMacbookStore } = await import('../store/index.js')

describe('useMacbookStore', () => {
  beforeEach(() => {
    // Reset the store to initial state before each test
    useMacbookStore.getState().reset()
  })

  describe('initial state', () => {
    it('has the correct default color', () => {
      expect(useMacbookStore.getState().color).toBe('#2e2c2e')
    })

    it('has the correct default scale', () => {
      expect(useMacbookStore.getState().scale).toBe(0.08)
    })

    it('has the correct default texture', () => {
      expect(useMacbookStore.getState().texture).toBe('/videos/feature-1.mp4')
    })
  })

  describe('setColor', () => {
    it('updates the color state', () => {
      useMacbookStore.getState().setColor('#ffffff')
      expect(useMacbookStore.getState().color).toBe('#ffffff')
    })

    it('updates to a different color', () => {
      useMacbookStore.getState().setColor('#ff0000')
      expect(useMacbookStore.getState().color).toBe('#ff0000')
    })

    it('does not affect other state fields when color is updated', () => {
      const beforeScale = useMacbookStore.getState().scale
      const beforeTexture = useMacbookStore.getState().texture
      useMacbookStore.getState().setColor('#aabbcc')
      expect(useMacbookStore.getState().scale).toBe(beforeScale)
      expect(useMacbookStore.getState().texture).toBe(beforeTexture)
    })
  })

  describe('setScale', () => {
    it('updates the scale state', () => {
      useMacbookStore.getState().setScale('0.1')
      expect(useMacbookStore.getState().scale).toBe(0.1)
    })

    it('parses string input as a float', () => {
      useMacbookStore.getState().setScale('0.05')
      expect(useMacbookStore.getState().scale).toBe(0.05)
    })

    it('handles numeric input directly', () => {
      useMacbookStore.getState().setScale(0.12)
      expect(useMacbookStore.getState().scale).toBe(0.12)
    })

    it('does not affect other state fields when scale is updated', () => {
      const beforeColor = useMacbookStore.getState().color
      const beforeTexture = useMacbookStore.getState().texture
      useMacbookStore.getState().setScale('0.2')
      expect(useMacbookStore.getState().color).toBe(beforeColor)
      expect(useMacbookStore.getState().texture).toBe(beforeTexture)
    })
  })

  describe('setTexture (new in this PR)', () => {
    it('updates the texture state', () => {
      useMacbookStore.getState().setTexture('/videos/feature-2.mp4')
      expect(useMacbookStore.getState().texture).toBe('/videos/feature-2.mp4')
    })

    it('can update to any video path', () => {
      useMacbookStore.getState().setTexture('/videos/feature-5.mp4')
      expect(useMacbookStore.getState().texture).toBe('/videos/feature-5.mp4')
    })

    it('accepts arbitrary string paths', () => {
      useMacbookStore.getState().setTexture('/custom/path/video.mp4')
      expect(useMacbookStore.getState().texture).toBe('/custom/path/video.mp4')
    })

    it('does not affect color or scale when texture is updated', () => {
      useMacbookStore.getState().setColor('#123456')
      useMacbookStore.getState().setScale('0.15')
      useMacbookStore.getState().setTexture('/videos/feature-3.mp4')
      expect(useMacbookStore.getState().color).toBe('#123456')
      expect(useMacbookStore.getState().scale).toBe(0.15)
    })

    it('multiple setTexture calls use the last value', () => {
      useMacbookStore.getState().setTexture('/videos/feature-2.mp4')
      useMacbookStore.getState().setTexture('/videos/feature-3.mp4')
      useMacbookStore.getState().setTexture('/videos/feature-4.mp4')
      expect(useMacbookStore.getState().texture).toBe('/videos/feature-4.mp4')
    })
  })

  describe('reset (updated in this PR to include texture)', () => {
    it('resets color to default', () => {
      useMacbookStore.getState().setColor('#ffffff')
      useMacbookStore.getState().reset()
      expect(useMacbookStore.getState().color).toBe('#2e2c2e')
    })

    it('resets scale to default', () => {
      useMacbookStore.getState().setScale('0.5')
      useMacbookStore.getState().reset()
      expect(useMacbookStore.getState().scale).toBe(0.08)
    })

    it('resets texture to default (new in this PR)', () => {
      useMacbookStore.getState().setTexture('/videos/feature-5.mp4')
      useMacbookStore.getState().reset()
      expect(useMacbookStore.getState().texture).toBe('/videos/feature-1.mp4')
    })

    it('resets all fields simultaneously', () => {
      useMacbookStore.getState().setColor('#ff0000')
      useMacbookStore.getState().setScale('0.2')
      useMacbookStore.getState().setTexture('/videos/feature-4.mp4')
      useMacbookStore.getState().reset()
      const state = useMacbookStore.getState()
      expect(state.color).toBe('#2e2c2e')
      expect(state.scale).toBe(0.08)
      expect(state.texture).toBe('/videos/feature-1.mp4')
    })

    it('reset is idempotent when already at default state', () => {
      useMacbookStore.getState().reset()
      useMacbookStore.getState().reset()
      const state = useMacbookStore.getState()
      expect(state.color).toBe('#2e2c2e')
      expect(state.scale).toBe(0.08)
      expect(state.texture).toBe('/videos/feature-1.mp4')
    })
  })

  describe('state persistence across actions', () => {
    it('setTexture followed by setColor preserves texture', () => {
      useMacbookStore.getState().setTexture('/videos/feature-2.mp4')
      useMacbookStore.getState().setColor('#aaaaaa')
      expect(useMacbookStore.getState().texture).toBe('/videos/feature-2.mp4')
    })

    it('setScale does not reset texture to default', () => {
      useMacbookStore.getState().setTexture('/videos/feature-3.mp4')
      useMacbookStore.getState().setScale('0.06')
      expect(useMacbookStore.getState().texture).toBe('/videos/feature-3.mp4')
    })
  })
})