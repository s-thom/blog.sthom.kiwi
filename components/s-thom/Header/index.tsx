import Image from 'next/image'
import Link from 'next/link'

import cs from 'classnames'
import { rootNotionPageId } from 'lib/config'
import { PageBlock } from 'notion-types'
import { getPageProperty, parsePageId, uuidToId } from 'notion-utils'
import { useNotionContext } from 'react-notion-x'

import { SvgWaves } from '../SvgWaves'
import { ThemeToggle } from '../ThemeToggle'
import styles from './Header.module.css'
import portraitSrc from './portrait-2020.jpg'

export interface HeaderProps {
  block?: PageBlock
}

export function Header({ block }: HeaderProps) {
  const { recordMap } = useNotionContext()

  const isRootPage =
    (block?.id && parsePageId(block?.id) === parsePageId(rootNotionPageId)) ||
    uuidToId(block.id) === 'cd4cc3da8cde4621927cb983fff5ad1d'

  const imageData =
    block.id && block.format?.page_cover
      ? {
          url: `/api/images/notion/${block.id}/cover`,
          yOffset: block.format.page_cover_position ?? 0.5
        }
      : undefined
  const theme = getPageProperty<string>('Theme', block, recordMap)

  return (
    <header className={cs(styles.Header, imageData && styles.hasImage)}>
      <div className={styles.waves}>
        <SvgWaves
          seed={block?.id ?? 'test'}
          width={1920}
          height={350}
          image={imageData}
          iconMaskId={theme}
          animated
        />
      </div>

      {!isRootPage && (
        <Link href='/'>
          <a className={styles.profile}>
            <div className={styles.imgWrapper}>
              <Image
                className={styles.img}
                src={portraitSrc}
                alt=''
                width={96}
                height={96}
                sizes='(min-width: 768px) 96px, 48px'
                priority
              />
            </div>

            <div className={styles.nameWrapper}>
              <h1 className={styles.name}>Stuart Thomson</h1>
              <p className={styles.tag}>Software Developer | Human Being</p>
            </div>
          </a>
        </Link>
      )}

      <ThemeToggle />
    </header>
  )
}
