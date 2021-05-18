import React, { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas, useLoader } from 'react-three-fiber'
import circle from './assets/circle.png'

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, circle)

  const count = 100
  const sep = 3
  let positions = useMemo(() => {
      let positions = []

      for(let xi = 0; xi < count; xi++){
          for(let zi = 0; zi < count; zi++){
              let x = sep * (xi - count / 2)
              let z = sep * (zi - count / 2)
              let y = 0
              positions.push(x, y, z)
          }
      }

      return new Float32Array(positions)
  }, [count, sep])

  return(
      <points>
          <bufferGeometry attach='geometry'>
              <bufferAttribute 
                  attachObject={['attributes', 'position']} 
                  array={positions}
                  count={positions.length / 3} 
                  itemSize={3}
              />
          </bufferGeometry>
          <pointsMaterial 
              attach='material'
              map={imgTex}
              color={0x00AAFF}
              size={0.5}
              sizeAttenuation
              transparent={false}
              alphaTest={0.5}
              opacity={1.0}
          />
      </points>
  )
}

function AnimateCanvas() {
  return (
      <Canvas
          colorManagment={false}
          camera={{ position: [100, 10, 0], fov: 75 }}
      >
          <Suspense fallback={null}>
              <Points />
          </Suspense>
      </Canvas>
  )
}

function Ripple () {
  return (
      <div className="animate">
          <Suspense fallback={<div>Loading...</div>}>
              <AnimateCanvas />
          </Suspense>
      </div>
  )
}

export default Ripple
