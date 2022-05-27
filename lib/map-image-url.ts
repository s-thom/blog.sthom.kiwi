import { Block } from 'notion-types'

import { mapBaseUrl } from './s-thom/mapBaseUrl'

function isProbablySigned(url: string): boolean {
  try {
    const u = new URL(url)

    if (
      u.pathname.startsWith('/secure.notion-static.com') &&
      u.hostname.endsWith('.amazonaws.com')
    ) {
      return true
    }
  } catch {
    // ignore invalid urls
  }

  return false
}

function getImageProxyUrl(url: string, block: Block): string {
  // Replace image URLs so signed links don't expire after ISG
  let type = 'image'
  if (block.type === 'page') {
    if (url === block.format.page_icon) {
      type = 'icon'
    } else if (url === block.format.page_cover) {
      type = 'cover'
    }
  } else if (block.type === 'bookmark') {
    if (url === block.format.bookmark_icon) {
      type = 'icon'
    } else if (url === block.format.bookmark_cover) {
      type = 'cover'
    }
  }

  return mapBaseUrl(`/api/images/notion/${block.id}/${type}`)
}

export const mapImageUrl = (url: string, block: Block): string => {
  if (!url) {
    return url
  }

  if (isProbablySigned(url)) {
    return getImageProxyUrl(url, block)
  }

  return mapBaseUrl(url)
}
