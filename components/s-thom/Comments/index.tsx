import Head from 'next/head'
import styles from './Comments.module.css'

export function Comments() {
  return (
    <div className={styles.wrapper}>
      <details
        className={`notion-callout notion-gray_background_co ${styles.details}`}
      >
        <summary>Comments (GitHub)</summary>
        <div className={`giscus ${styles.giscus}`} />
      </details>

      <Head>
        <script
          src='https://giscus.app/client.js'
          data-repo='s-thom/blog.sthom.kiwi'
          data-repo-id='R_kgDOG3onwg'
          data-category='Comments'
          data-category-id='DIC_kwDOG3onws4CPmJe'
          data-mapping='pathname'
          data-reactions-enabled='0'
          data-emit-metadata='0'
          data-input-position='bottom'
          data-theme='light'
          data-lang='en'
          data-loading='lazy'
          crossOrigin='anonymous'
          async
        ></script>
      </Head>
    </div>
  )
}
