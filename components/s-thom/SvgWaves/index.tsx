import { PropsWithChildren, memo } from 'react'

import seedrandom from 'seedrandom'

import { Content } from './content'
import { IconMask } from './iconMask'
import { WaveMask } from './waveMask'

interface SvgWavesProps extends PropsWithChildren {
  seed: string
  width: number
  height: number
  animated?: boolean
  backgroundColor?: string
  image?: { url: string; yOffset: number }
  iconMaskId?: string
}

function SvgWaves({
  children,
  seed,
  width,
  height,
  animated,
  image,
  iconMaskId
}: SvgWavesProps) {
  // Specifically do not want to memoise this, which means none of
  // the implementation of this component can be safely memoised.
  const random = seedrandom(seed)

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      style={{ minWidth: `${width}px` }}
      preserveAspectRatio='xMidYMid'
      viewBox={`0 0 ${width} ${height}`}
    >
      <style>{`
        .fill-color {
          fill: #002355;
          fill: var(--sthom-theme);
        }
        .wave-mask {
          fill: rgba(255, 255, 255, 0.4);
          fill: var(--sthom-wave-mask);
        }
      `}</style>
      {iconMaskId && (
        <IconMask
          id='icons'
          random={random}
          iconMaskId={iconMaskId}
          minIconSize={height * 0.75}
          maxIconSize={height}
          width={width}
          height={height}
        />
      )}
      <WaveMask
        id='waves'
        random={random}
        width={width}
        height={height}
        numDisplacements={2}
        pathCount={7}
        animation={
          animated ? { durationSeconds: 60, numKeyframes: 4 } : undefined
        }
        maskId={iconMaskId ? 'icons' : undefined}
      />
      <Content width={width} height={height} image={image} maskId='waves' />
      {children}
    </svg>
  )
}

const MemoSvgWaves = memo(SvgWaves)

export { MemoSvgWaves as SvgWaves }
