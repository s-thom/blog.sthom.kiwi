import {
  CodeBlock,
  CollectionView,
  EmbedBlock,
  ExtendedRecordMap
} from 'notion-types'
import { getPageContentBlockIds } from 'notion-utils'

import { mutateFilterCollection } from './filterCollection'
import { highlightCode } from './shiki'

async function mutateCode(block: CodeBlock) {
  // Override the content of the code block to be the highlighted code by Shiki.
  // This is done at this stage, as extra build steps would be required to get it running in the browser.
  const html = await highlightCode(block)
  if (html) {
    ;(block as any).RAW_HTML = html
  }
}

function mutateEmbed(block: EmbedBlock) {
  if (!block.format?.display_source) {
    return
  }

  // If the link is for the embed landing page, replace it with the destination.
  // The reason for this is documented in `pages/embed/index.tsx`
  const url = new URL(block.format.display_source)
  if (url.hostname.match(/\.sthom\.kiwi$/)) {
    if (url.pathname === '/embed') {
      // Get search parameter
      const name = url.searchParams.get('name')
      if (name) {
        block.format.display_source = `/embed/${name}`
      }
      return
    }

    if (url.pathname.match(/^\/embed\/[^/]+/)) {
      block.format.display_source = url.pathname
    }
  }
}

async function mutateCollectionView(
  view: CollectionView,
  recordMap: ExtendedRecordMap
) {
  if (!view.format?.collection_pointer) {
    return
  }

  const collection =
    recordMap.collection[view.format.collection_pointer.id]?.value
  if (!collection) {
    return
  }
  const query = recordMap.collection_query[collection.id]?.[view.id]
  if (!query) {
    return
  }

  mutateFilterCollection(collection, view, query, recordMap)
}

export async function mutateRecordMap(recordMap: ExtendedRecordMap) {
  const promises: Promise<void>[] = []

  // Mutate blocks
  const allBlockIds = getPageContentBlockIds(recordMap)
  for (const blockId of allBlockIds) {
    const block = recordMap.block[blockId]?.value
    if (block) {
      switch (block.type) {
        case 'code':
          promises.push(mutateCode(block))
          break
        case 'embed':
          mutateEmbed(block)
          break
      }
    }
  }

  // Mutate views and collections
  const allViewIds = Object.keys(recordMap.collection_view)
  for (const viewId of allViewIds) {
    const view = recordMap.collection_view[viewId]?.value
    if (view) {
      promises.push(mutateCollectionView(view, recordMap))
    }
  }

  await Promise.all(promises)
}
