import Link from 'next/link'

import { useSearchParam } from 'react-use'

// Hello and welcome to my world of hacks.
// This website is filled with them.
// This one solves a very particular problem. I do my content editing in Notion, but my development work locally.
// This means that any iframes in Notion have to point to production. However, I may still be writing code for
// pages that haven't been published yet, and I want to see those iframes in development.
// My solution is as follows:
// 1. Publish a page to production that can be embedded (this one).
// 2. Have a query parameter in the URL that refers to the intended embed.
// 3. In that page, link to the indented embed in case anybody stumbles across it.
// 4. In the actual website, do a sneaky switcharoo of the URLs so normal users don't see the hack.
//    * This is done in `lib/s-thom/mutateRecordMap.ts`
// 5. Cry, because it's weird hacky code that you have to support for the lifetime of this website
// 6. (not started) Stop crying, because you could just rewrite your website again 😉

export default function EmbedRootPage() {
  const embedName = useSearchParam('name')

  return (
    <div>
      <h1>
        <a href='/' className='default-style'>
          home
        </a>
      </h1>
      <noscript>
        <p>
          you currently have javascript turned off. these interactive bits
          require it to work
        </p>
      </noscript>
      {embedName && (
        <p>
          try{' '}
          <Link href={`/embed/${embedName}`}>
            <a className='default-style'>visiting this link</a>
          </Link>{' '}
          instead
        </p>
      )}
    </div>
  )
}
