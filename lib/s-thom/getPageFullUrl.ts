// include UUIDs in page URLs during local development but not in production
import { ExtendedRecordMap } from 'notion-types'
import { parsePageId, uuidToId } from 'notion-utils'

import { includeNotionIdInUrls } from '../config'
import { getCanonicalPageId } from '../get-canonical-page-id'
import { Site } from '../types'

export function getPageFullUrl(
  site: Site,
  recordMap: ExtendedRecordMap,
  pageId: string
): string {
  const pageUuid = parsePageId(pageId, { uuid: true })

  const chain: string[] = []
  let currentUuid = pageId
  let forceTopLevel = false
  while (uuidToId(currentUuid) !== site.rootNotionPageId) {
    // Page won't exist in record map if it's not available by API
    const page = recordMap.block[currentUuid]?.value
    if (!page) {
      forceTopLevel = true
      break
    }

    chain.unshift(currentUuid)

    if (page.parent_table === 'space') {
      // We've reached the top of the tree without reaching the root page
      forceTopLevel = true
      break
    }
    if (page.parent_table === 'block') {
      // Continue the loop
      currentUuid = page.parent_id
      continue
    }
    if (page.parent_table === 'collection') {
      const collection = recordMap.collection[page.parent_id]?.value
      if (!collection) {
        forceTopLevel = true
        break
      }

      const viewBlock = recordMap.block[collection.parent_id]?.value
      if (!viewBlock) {
        forceTopLevel = true
        break
      }

      currentUuid = viewBlock.parent_id
      continue
    }

    throw new Error(`unknown parent type ${page.parent_table}`)
  }

  // If we're forcing a top level page, then only include this page's uuid
  if (forceTopLevel) {
    chain.splice(0, chain.length, pageUuid)
  }

  const segments = chain.map((uuid, index) => {
    const includeId = !!includeNotionIdInUrls && index === chain.length - 1

    return getCanonicalPageId(uuid, recordMap, { uuid: includeId })
  })

  return segments.join('/')
}
