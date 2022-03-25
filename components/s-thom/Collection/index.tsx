import dynamic from 'next/dynamic'

import { isDev } from 'lib/config'
import { getPagePropertyRaw } from 'lib/s-thom/properties'
import { uuidToId } from 'notion-utils'
import { Text } from 'react-notion-x'

import styles from './Collection.module.css'

const NotionCollection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

type CollectionProps = React.ComponentProps<typeof NotionCollection>

export function Collection(props: React.PropsWithChildren<CollectionProps>) {
  const { block, ctx } = props

  const openInNotion =
    block.type === 'page' && isDev ? (
      <div className='notion-callout notion-blue_background_co'>
        <div className='notion-page-icon-inline notion-page-icon-span'>
          <span className='notion-page-icon' role='img' aria-label='✏'>
            ✏
          </span>
        </div>
        <div className='notion-callout-text'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className='notion-link'
            href={`https://notion.so/${uuidToId(block.id)}`}
          >
            Open in Notion
          </a>
        </div>
      </div>
    ) : null

  const collection =
    block.type === 'page' ? (
      <div className='notion-collection-row' />
    ) : (
      <NotionCollection {...props} />
    )

  const coverImageData = getPagePropertyRaw(
    'Cover Source',
    block,
    ctx.recordMap
  )
  const coverImage =
    block.type === 'page' && coverImageData ? (
      <aside className={styles.coverImageText}>
        Cover image: <Text value={coverImageData} block={block} />
      </aside>
    ) : null

  return (
    <>
      {openInNotion}
      {coverImage}
      {collection}
    </>
  )
}
