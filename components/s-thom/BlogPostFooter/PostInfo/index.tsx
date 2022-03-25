import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { Block } from 'notion-types'
import { useNotionContext } from 'react-notion-x'

import portraitSrc from '../../Header/portrait-2020.jpg'
import styles from './PostInfo.module.css'

const NotionCollection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)

export interface PostInfoProps {
  block: Block
}

export function PostInfo({ block }: PostInfoProps) {
  const ctx = useNotionContext()

  return (
    <footer className={styles.wrapper}>
      <div
        className={`notion-callout notion-gray_background_co ${styles.details}`}
      >
        {(block.type === 'collection_view_page' ||
          (block.type === 'page' && block.parent_table === 'collection')) && (
          <NotionCollection block={block} ctx={ctx} />
        )}
        <div className={styles.authorSection}>
          <div className={styles.imgWrapper}>
            <Image
              className={styles.img}
              src={portraitSrc}
              alt=''
              width={48}
              height={48}
              sizes='48px'
              priority
            />
          </div>
          <div className={styles.text}>
            <span className={styles.writtenBy}>Written by</span>
            <span className={styles.name}>Stuart Thomson</span>
          </div>
          <div className={styles.backLink}>
            <Link href='/blog' passHref>
              <a className='notion-link'>
                Back to <br />
                Posts
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
