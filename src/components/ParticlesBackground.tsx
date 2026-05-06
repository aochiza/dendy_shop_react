import { useMemo } from 'react'
import Particles from 'react-tsparticles'
import type { ISourceOptions } from 'tsparticles-engine'

export function ParticlesBackground() {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      fpsLimit: 60,
      background: { color: { value: 'transparent' } },
      particles: {
        number: { value: 40, density: { enable: true } },
        color: { value: ['#39ff14', '#00ff88'] },
        opacity: { value: 0.12 },
        size: { value: { min: 1, max: 2 } },
        move: { enable: true, speed: 0.35, outModes: { default: 'out' } },
        links: { enable: true, color: '#39ff14', opacity: 0.06, distance: 150 },
      },
      detectRetina: true,
    }),
    [],
  )

  return <Particles id="crt-bg" options={options} />
}

