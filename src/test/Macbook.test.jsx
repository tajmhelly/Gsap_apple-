import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { render } from '@testing-library/react'
import React, { useEffect } from 'react'
import { Color, ClampToEdgeWrapping } from 'three'

// ─── Mock three/tsl ─────────────────────────────────────────────────────────
vi.mock('three/tsl', () => ({
  texture: null,
  cross: vi.fn(),
}))

// ─── Shared mock objects ─────────────────────────────────────────────────────
const mockScreenTexture = {
  wrapS: undefined,
  wrapT: undefined,
  flipY: true,
}

const makeMockScene = (meshes = []) => ({
  traverse: vi.fn((fn) => meshes.forEach(fn)),
})

// ─── Mock @react-three/drei ──────────────────────────────────────────────────
vi.mock('@react-three/drei', () => {
  const useGLTF = vi.fn()
  useGLTF.preload = vi.fn()
  return {
    useGLTF,
    useVideoTexture: vi.fn(() => ({ wrapS: undefined, wrapT: undefined, flipY: true })),
  }
})

// ─── Mock @react-three/fiber ─────────────────────────────────────────────────
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div>{children}</div>,
}))

// ─── Mock store ──────────────────────────────────────────────────────────────
const mockSetTexture = vi.fn()
let mockStoreState = {
  color: '#2e2c2e',
  texture: '/videos/feature-1.mp4',
  setTexture: mockSetTexture,
}
vi.mock('../store/index.js', () => ({
  default: vi.fn(() => mockStoreState),
}))

import { useGLTF, useVideoTexture } from '@react-three/drei'
import useMacbookStore from '../store/index.js'
import Macbook from '../components/models/Macbook.jsx'

// Helper to build mock GLTF scene with named meshes
function buildMockGLTF(meshNames = []) {
  const nodes = {}
  const materials = {}

  // Provide all Object_* geometry nodes the component references
  const geometryNames = [
    'Object_10', 'Object_16', 'Object_20', 'Object_22', 'Object_30',
    'Object_32', 'Object_34', 'Object_38', 'Object_42', 'Object_48',
    'Object_54', 'Object_58', 'Object_66', 'Object_74', 'Object_82',
    'Object_96', 'Object_107', 'Object_123', 'Object_127',
  ]
  const materialNames = [
    'PaletteMaterial001', 'zhGRTuGrQoJflBD', 'PaletteMaterial002',
    'lmWQsEjxpsebDlK', 'LtEafgAVRolQqRw', 'iyDJFXmHelnMTbD',
    'eJObPwhgFzvfaoZ', 'nDsMUuDKliqGFdU', 'CRQixVLpahJzhJc',
    'YYwBgwvcyZVOOAA', 'SLGkCohDDelqXBu', 'WnHKXHhScfUbJQi',
    'fNHiBfcxHUJCahl', 'LpqXZqhaGCeSzdu', 'gMtYExgrEUqPfln',
    'PaletteMaterial003', 'JvMFZolVCdpPqjj', 'ZCDwChwkbBfITSW',
  ]

  geometryNames.forEach((name) => {
    nodes[name] = { geometry: { type: 'BufferGeometry' } }
  })
  materialNames.forEach((name) => {
    materials[name] = { color: new Color('#ffffff'), type: 'MeshStandardMaterial' }
  })

  const meshObjects = meshNames.map((name) => ({
    isMesh: true,
    name,
    material: { color: new Color('#ffffff') },
  }))

  const nonMeshObjects = [{ isMesh: false, name: 'group' }]
  const scene = makeMockScene([...meshObjects, ...nonMeshObjects])

  return { nodes, materials, scene }
}

describe('Macbook component (modified in this PR)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockStoreState = {
      color: '#2e2c2e',
      texture: '/videos/feature-1.mp4',
      setTexture: mockSetTexture,
    }
    useMacbookStore.mockReturnValue(mockStoreState)
    useVideoTexture.mockReturnValue({ ...mockScreenTexture })

    const gltf = buildMockGLTF(['body', 'keyboard', 'screen', 'lens'])
    useGLTF.mockReturnValue(gltf)
  })

  describe('video texture (new in this PR)', () => {
    it('calls useVideoTexture with the texture from the store', () => {
      render(<Macbook />, { wrapper: ({ children }) => <>{children}</> })
      expect(useVideoTexture).toHaveBeenCalledWith('/videos/feature-1.mp4')
    })

    it('calls useVideoTexture with a different texture path when store changes', () => {
      mockStoreState.texture = '/videos/feature-3.mp4'
      useMacbookStore.mockReturnValue(mockStoreState)
      render(<Macbook />)
      expect(useVideoTexture).toHaveBeenCalledWith('/videos/feature-3.mp4')
    })

    it('sets wrapS to ClampToEdgeWrapping on the screen texture', () => {
      const screenTex = { wrapS: undefined, wrapT: undefined, flipY: true }
      useVideoTexture.mockReturnValue(screenTex)
      render(<Macbook />)
      expect(screenTex.wrapS).toBe(ClampToEdgeWrapping)
    })

    it('sets wrapT to ClampToEdgeWrapping on the screen texture', () => {
      const screenTex = { wrapS: undefined, wrapT: undefined, flipY: true }
      useVideoTexture.mockReturnValue(screenTex)
      render(<Macbook />)
      expect(screenTex.wrapT).toBe(ClampToEdgeWrapping)
    })

    it('sets flipY to false on the screen texture', () => {
      const screenTex = { wrapS: undefined, wrapT: undefined, flipY: true }
      useVideoTexture.mockReturnValue(screenTex)
      render(<Macbook />)
      expect(screenTex.flipY).toBe(false)
    })

    it('does not throw when screen texture is null', () => {
      useVideoTexture.mockReturnValue(null)
      expect(() => render(<Macbook />)).not.toThrow()
    })
  })

  describe('color updates via scene.traverse (new in this PR)', () => {
    it('calls scene.traverse when color changes', () => {
      const gltf = buildMockGLTF(['body', 'keyboard'])
      useGLTF.mockReturnValue(gltf)
      render(<Macbook />)
      expect(gltf.scene.traverse).toHaveBeenCalled()
    })

    it('updates color on non-excluded mesh parts', () => {
      const bodyMesh = { isMesh: true, name: 'body', material: { color: new Color('#ffffff') } }
      const scene = makeMockScene([bodyMesh])
      useGLTF.mockReturnValue({ ...buildMockGLTF([]).nodes, ...buildMockGLTF([]).materials, scene, nodes: buildMockGLTF([]).nodes, materials: buildMockGLTF([]).materials })
      mockStoreState.color = '#ff0000'
      useMacbookStore.mockReturnValue(mockStoreState)
      render(<Macbook />)
      expect(bodyMesh.material.color).toEqual(new Color('#ff0000'))
    })

    it('does not update color on "screen" mesh (excluded part)', () => {
      const screenMesh = { isMesh: true, name: 'screen', material: { color: new Color('#ffffff') } }
      const originalColor = new Color('#ffffff')
      const { scene, nodes, materials } = buildMockGLTF([])
      scene.traverse.mockImplementation((fn) => fn(screenMesh))
      useGLTF.mockReturnValue({ nodes, materials, scene })
      mockStoreState.color = '#ff0000'
      useMacbookStore.mockReturnValue(mockStoreState)
      render(<Macbook />)
      // screen mesh color should NOT be changed
      expect(screenMesh.material.color).toEqual(originalColor)
    })

    it('does not update color on "lens" mesh (excluded part)', () => {
      const lensMesh = { isMesh: true, name: 'lens', material: { color: new Color('#aaaaaa') } }
      const originalColor = new Color('#aaaaaa')
      const { scene, nodes, materials } = buildMockGLTF([])
      scene.traverse.mockImplementation((fn) => fn(lensMesh))
      useGLTF.mockReturnValue({ nodes, materials, scene })
      mockStoreState.color = '#00ff00'
      useMacbookStore.mockReturnValue(mockStoreState)
      render(<Macbook />)
      expect(lensMesh.material.color).toEqual(originalColor)
    })

    it('skips non-mesh objects during traverse', () => {
      const groupNode = { isMesh: false, name: 'group', material: undefined }
      const { scene, nodes, materials } = buildMockGLTF([])
      scene.traverse.mockImplementation((fn) => fn(groupNode))
      useGLTF.mockReturnValue({ nodes, materials, scene })
      // Should not throw even when isMesh=false (no material access)
      expect(() => render(<Macbook />)).not.toThrow()
    })
  })

  describe('noChangeParts constant', () => {
    it('excludes both "screen" and "lens" from color updates', () => {
      const screenMesh = { isMesh: true, name: 'screen', material: { color: new Color('#ffffff') } }
      const lensMesh = { isMesh: true, name: 'lens', material: { color: new Color('#ffffff') } }
      const bodyMesh = { isMesh: true, name: 'body', material: { color: new Color('#ffffff') } }

      const { scene, nodes, materials } = buildMockGLTF([])
      scene.traverse.mockImplementation((fn) => {
        fn(screenMesh)
        fn(lensMesh)
        fn(bodyMesh)
      })
      useGLTF.mockReturnValue({ nodes, materials, scene })
      mockStoreState.color = '#123456'
      useMacbookStore.mockReturnValue(mockStoreState)

      render(<Macbook />)

      // Only body gets updated
      expect(bodyMesh.material.color).toEqual(new Color('#123456'))
      // screen and lens are unchanged
      expect(screenMesh.material.color).toEqual(new Color('#ffffff'))
      expect(lensMesh.material.color).toEqual(new Color('#ffffff'))
    })
  })

  describe('store integration', () => {
    it('reads color and texture from the Zustand store', () => {
      render(<Macbook />)
      expect(useMacbookStore).toHaveBeenCalled()
    })

    it('passes props to the root group element (e.g., scale, position)', () => {
      const { container } = render(<Macbook scale={0.05} />)
      // Component renders without throwing when props are passed
      expect(container).toBeTruthy()
    })
  })

  describe('GLTF loading', () => {
    it('loads the macbook.glb model', () => {
      render(<Macbook />)
      expect(useGLTF).toHaveBeenCalledWith('/models/macbook.glb')
    })
  })
})