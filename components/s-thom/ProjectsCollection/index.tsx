import dynamic from 'next/dynamic'

import { dummyLink } from 'react-notion-x'

const NotionCollection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

type CollectionProps = React.ComponentProps<typeof NotionCollection>

export function ProjectsCollection(
  props: React.PropsWithChildren<CollectionProps>
) {
  const { ctx } = props

  return (
    <NotionCollection
      {...props}
      ctx={{
        ...ctx,
        components: {
          ...ctx.components,
          // Disable <a> tags so the cards aren't page links
          Link: dummyLink,
          PageLink: dummyLink
        }
      }}
    />
  )
}
