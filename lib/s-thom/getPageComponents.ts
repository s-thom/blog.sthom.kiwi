import dynamic from 'next/dynamic'

import { propertyTitleValue as projectsTitle } from 'components/s-thom/ProjectsCollection/projectsTitle'
import { uuidToId } from 'notion-utils'
import { NotionComponents } from 'react-notion-x'

const Code = dynamic(() => import('components/s-thom/Code').then((m) => m.Code))
const Collection = dynamic(() =>
  import('components/s-thom/Collection').then((m) => m.Collection)
)
const PageLinkCollectionOnly = dynamic(() =>
  import('components/s-thom/PageLinkCollectionOnly').then(
    (m) => m.PageLinkCollectionOnly
  )
)
const ProjectsCollection = dynamic(() =>
  import('components/s-thom/ProjectsCollection').then(
    (m) => m.ProjectsCollection
  )
)

interface PageComponentOverrides {
  [pageId: string]: Partial<NotionComponents> | undefined
}

const defaultOverrides: Partial<NotionComponents> = {
  Code,
  Collection: Collection
}
const pageComponentOverrides: PageComponentOverrides = {
  // Index page
  '25c54908c86d426ca1c7af314e09d74b': {
    PageLink: PageLinkCollectionOnly
  },
  // Projects page
  '9203d913b92c400cbb7f597125b3dd51': {
    Collection: ProjectsCollection,
    propertyTitleValue: projectsTitle
  }
}

export function getPageComponents(
  pageId: string | undefined
): Partial<NotionComponents> {
  if (!pageId) {
    return {}
  }

  return {
    ...defaultOverrides,
    ...(pageComponentOverrides[uuidToId(pageId)] ?? {})
  }
}
