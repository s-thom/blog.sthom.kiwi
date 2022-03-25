import { NextApiHandler } from 'next'

import * as https from 'https'
import { defaultMapImageUrl } from 'react-notion-x'
import sharp, { ResizeOptions } from 'sharp'
import { Readable } from 'stream'

import { rootNotionSpaceId } from '@/lib/config'
import { notion } from '@/lib/notion-api'

const REVALIDATE = 'public, max-age=2592000, stale-while-revalidate=86400'

const getNotionImage: NextApiHandler = async (req, res) => {
  const { blockId, imageType } = req.query as {
    blockId: string
    imageType: string
  }

  const blocks = await notion.getBlocks([blockId])
  const block = blocks.recordMap.block[blockId]?.value

  if (!block) {
    console.log("Block doesn't exist:", blockId)
    res.writeHead(404, 'Asset not found').end()
    return
  }

  if (
    rootNotionSpaceId &&
    blocks.recordMap.block[blockId].value.space_id !== rootNotionSpaceId
  ) {
    console.log('Requested block is not in space:', blockId)
    res.writeHead(404, 'Asset not found').end()
    return
  }

  let url
  // eslint-disable-next-line prefer-const
  let shouldReEncode = false
  let resize: ResizeOptions | undefined
  switch (block.type) {
    case 'image':
      url = defaultMapImageUrl(block.properties.source[0][0], block)
      // shouldReEncode = true
      break
    case 'page':
      switch (imageType) {
        case 'icon':
          url = defaultMapImageUrl(block.format.page_icon, block)
          // shouldReEncode = true
          break
        default:
          url = defaultMapImageUrl(block.format.page_cover, block)
          // shouldReEncode = true
          // Resize the images certain collection pages
          switch (block.parent_id) {
            case 'b749d283-ebbd-4b6f-92d4-13301479c2da':
              // Even with the blurring, compression artifacts are visible on page covers.
              // Otherwise I'd have cut it down a bunch. May still do that at some point.
              // The aspect ration given here is roughly equivalent to that of the images in post previews.
              // resize = { width: 1920, height: 560 }
              break
            default:
          }
      }
      break
    case 'bookmark':
      switch (imageType) {
        case 'icon':
          url = defaultMapImageUrl(block.format.bookmark_icon, block)
          break
        default:
          url = defaultMapImageUrl(block.format.bookmark_cover, block)
        // shouldReEncode = true
      }
      break
    case 'callout':
      url = defaultMapImageUrl(block.format.page_icon, block)
      break
    default:
      console.log(
        'Requested block is not of a known type:',
        blockId,
        block.type
      )
      res.writeHead(404, 'Asset not found').end()
      return
  }

  if (!url) {
    console.log('URL somehow undefined:', blockId)
    res.writeHead(404, 'Asset not found').end()
    return
  }

  return new Promise<void>((resolve, reject) => {
    https.get(url, (getResponse) => {
      const proxyHeader = (header: string) => {
        const value =
          getResponse.headers[header] ||
          getResponse.headers[header.toLowerCase()]
        if (value) {
          res.setHeader(header, value)
        }
      }

      let pipeline: Readable = getResponse
      if (shouldReEncode) {
        const match = req.headers.accept?.match(/image\/(avif|webp|png|jpeg)/)
        let encoding = match?.[1] ?? 'jpeg'

        const converter = sharp()
        switch (encoding) {
          case 'avif':
            converter.avif()
            break
          case 'webp':
            converter.webp()
            break
          case 'png':
            converter.png()
            break
          case 'jpeg':
          default:
            encoding = 'jpeg'
            converter.jpeg()
        }

        if (resize) {
          converter.resize(resize)
        }

        pipeline = pipeline.pipe(converter)
        res.setHeader('Content-Type', `image/${encoding}`)
      } else {
        proxyHeader('Content-Type')
        proxyHeader('Content-Length')
      }

      res.setHeader('Vary', 'Accept')
      if (getResponse.statusCode === 200) {
        res.setHeader('Cache-Control', REVALIDATE)
        res.writeHead(200, 'OK')
      } else {
        res.status(getResponse.statusCode || 500)
      }

      pipeline
        .pipe(res)
        .on('end', () => {
          res.end()
          resolve()
        })
        .on('error', (err) => {
          console.log('Pipe error', err)
          res.writeHead(500, err.toString())
          res.end()
          reject(err)
        })
    })
  })
}

export default getNotionImage
