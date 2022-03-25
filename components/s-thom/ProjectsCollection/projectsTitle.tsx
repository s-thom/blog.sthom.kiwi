import { FiExternalLink } from '@react-icons/all-files/fi/FiExternalLink'
import { FiGithub } from '@react-icons/all-files/fi/FiGithub'
import { getPageProperty } from 'notion-utils'
import {
  NotionContextProvider,
  NotionRenderer,
  Text,
  useNotionContext
} from 'react-notion-x'
import { Property } from 'react-notion-x/build/third-party/collection'

import styles from './projectsTitle.module.css'

type IPropertyProps = React.ComponentProps<typeof Property>

function TitleImpl(props: IPropertyProps) {
  const ctx = useNotionContext()
  const { block, data } = props

  const title = block.properties.title[0][0]

  const url = getPageProperty<string>('URL', block, ctx.recordMap)
  const subtitle = getPageProperty<string>('Subtitle', block, ctx.recordMap)
  const github = getPageProperty<string>('GitHub', block, ctx.recordMap)

  const shouldRenderIcons = !!url || !!github

  return (
    <div>
      <NotionContextProvider
        {...(ctx as any)}
        components={{
          propertyTitleValue: undefined,
          Collection: () => null
        }}
      >
        <span className='notion-page-title'>
          <span className='notion-page-title-text'>
            <Text block={block} value={data} />
          </span>
        </span>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        {shouldRenderIcons && (
          <div className={styles.iconRow}>
            {url && (
              <a href={url} target='_blank' rel='noreferrer'>
                <FiExternalLink title={`Open ${title} in new tab`} />
              </a>
            )}
            {github && (
              <a
                href={`https://github.com/${github}`}
                target='_blank'
                rel='noreferrer'
              >
                <FiGithub title={`View source code for ${github} on GitHub`} />
              </a>
            )}
          </div>
        )}
        <NotionRenderer
          blockId={block.id}
          recordMap={ctx.recordMap}
          bodyClassName={styles.content}
        />
      </NotionContextProvider>
    </div>
  )
}

export function propertyTitleValue(props: IPropertyProps) {
  return <TitleImpl {...props} />
}
