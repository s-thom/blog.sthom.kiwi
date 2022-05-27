import * as https from 'https'
import { rootNotionSpaceId } from 'lib/config'
import { NextApiHandler } from 'next'
import { defaultMapImageUrl } from 'react-notion-x'
import { notion } from '../../../../lib/notion-api'

const IMMUTABLE = 'public, max-age=31536000, immutable'
const REVALIDATE = 'public, s-maxage=59, stale-while-revalidate'

const getNotionImage: NextApiHandler = async (req, res) => {
  const blockId = req.query.imageId as string
  const typeHint = req.query.disambiguate as string

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
  switch (block.type) {
    case 'image':
      url = defaultMapImageUrl(block.properties.source[0][0], block)
      break
    case 'page':
      if (typeHint === 'icon') {
        url = defaultMapImageUrl(block.format.page_icon, block)
      } else {
        url = defaultMapImageUrl(block.format.page_cover, block)
      }
      break
    case 'bookmark':
      if (typeHint === 'icon') {
        url = defaultMapImageUrl(block.format.bookmark_icon, block)
      } else {
        url = defaultMapImageUrl(block.format.bookmark_cover, block)
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

      proxyHeader('Content-Type')
      proxyHeader('Content-Length')

      if (getResponse.statusCode === 200) {
        res.setHeader(
          'Cache-Control',
          block.last_edited_time ? IMMUTABLE : REVALIDATE
        )
        res.writeHead(200, 'OK')
      } else {
        res.status(getResponse.statusCode || 500)
      }

      getResponse
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
