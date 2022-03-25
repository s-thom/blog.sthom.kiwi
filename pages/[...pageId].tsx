import * as React from 'react'
import { GetStaticProps } from 'next'

import { NotionPage } from '@/components/NotionPage'
import { domain, isDev } from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { resolveNotionPage } from '@/lib/resolve-notion-page'
import { getPageComponents } from '@/lib/s-thom/getPageComponents'
import { PageProps, Params } from '@/lib/types'

export const getStaticProps: GetStaticProps<PageProps, Params> = async (
  context
) => {
  const pageIdArray = context.params.pageId as string[]
  const rawPageId = pageIdArray[pageIdArray.length - 1]

  try {
    const props = await resolveNotionPage(domain, rawPageId)

    return { props, revalidate: 10 }
  } catch (err) {
    console.error('page error', domain, rawPageId, err)

    // we don't want to publish the error version of this page, so
    // let next.js know explicitly that incremental SSG failed
    throw err
  }
}

export async function getStaticPaths() {
  if (isDev) {
    return {
      paths: [],
      fallback: true
    }
  }

  const siteMap = await getSiteMap()

  const staticPaths = {
    paths: Object.entries(siteMap.fullUrlMap)
      .filter(([id, path]) => id !== siteMap.site.rootNotionPageId && !!path)
      .map(([, path]) => ({
        params: {
          pageId: path.split('/')
        }
      })),
    // paths: [],
    fallback: 'blocking'
  }

  console.log(staticPaths.paths)
  return staticPaths
}

export default function NotionDomainDynamicPage(props: PageProps) {
  return <NotionPage {...props} components={getPageComponents(props.pageId)} />
}

export const config = {
  unstable_includeFiles: [
    'node_modules/@types/**/*.json',
    'node_modules/@types/**/*.ts',
    'node_modules/typescript/lib/lib.*.ts',
    'node_modules/shiki/languages/*.json',
    'node_modules/shiki/themes/*.json'
  ],
  unstable_runtimeJS: false
}
