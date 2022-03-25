import { memo } from 'react'

import { NotionComponents } from 'react-notion-x'

// https://github.com/NotionX/react-notion-x/blob/cfbfcc15145d9ece96d2fa526b5c4f8305576c99/packages/react-notion-x/src/context.tsx#L75
const DefaultPageLink: React.FC = (props) => <a {...props} />
const DefaultPageLinkMemo = memo(DefaultPageLink)

export function PageLinkCollectionOnly(
  props: React.ComponentProps<NotionComponents['PageLink']>
) {
  // Only show links to other pages if they're in the card collection.
  // This prevents immediate child pages of the index page from showing up at the bottom
  // (which Notion does for child pages).
  if (props.className.match(/notion-collection-card/)) {
    return <DefaultPageLinkMemo {...props} />
  }

  return null
}
