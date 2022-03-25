interface ContentProps {
  width: number
  height: number
  image?: { url: string; yOffset: number }
  maskId?: string
}

export function Content({ width, height, image, maskId }: ContentProps) {
  if (image) {
    return (
      // TODO: implement y offset somehow
      <image
        x='0'
        y='0'
        width={width}
        height={height}
        href={image.url}
        preserveAspectRatio='xMidYMid slice'
        mask={maskId ? `url(#${maskId})` : undefined}
      />
    )
  }

  return (
    <rect
      x='0'
      y='0'
      className='fill-color'
      width={width}
      height={height}
      mask={maskId ? `url(#${maskId})` : undefined}
    />
  )
}
