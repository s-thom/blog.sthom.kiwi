import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

import styles from './styles.module.css'

const NotionCode = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)

const HomeContent = dynamic(() =>
  import('components/s-thom/HomeContent').then((m) => m.HomeContent)
)

const OVERRIDES: { [key: string]: ComponentType | undefined } = {
  home: HomeContent
}

type CodeProps = React.ComponentProps<typeof NotionCode>

export function Code(props: React.PropsWithChildren<CodeProps>) {
  const { block } = props

  const override: string | undefined = (block as any).OVERRIDE_COMPONENT
  if (override && OVERRIDES[override]) {
    const Component = OVERRIDES[override]
    return <Component />
  }

  const code: string | undefined = (block as any).RAW_HTML

  if (code) {
    return (
      <div className={styles.wrapper}>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
    )
  }

  return <NotionCode {...props} />
}
