import * as React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'

import { IconContext } from '@react-icons/all-files'
import { isDev } from 'lib/config'

export default class MyDocument extends Document {
  render() {
    return (
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Html lang='en'>
          <Head>
            <link rel='shortcut icon' href='/favicon.ico' />

            <link
              rel='apple-touch-icon'
              sizes='180x180'
              href='/icons/apple-icon.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='96x96'
              href='/icons/favicon-96x96.png'
            />
            <link
              rel='icon'
              type='image/png'
              sizes='32x32'
              href='/icons/favicon-32x32.png'
            />
            <link
              type='image/png'
              sizes='16x16'
              href='/icons/favicon-16x16.png'
            />

            <link rel='manifest' href='/manifest.json' />

            {!isDev && (
              <meta
                name='monetization'
                content='$webmonetization.org/api/receipts/%24ilp.uphold.com%2FpMRrbhLXUPqU'
              />
            )}

            {!isDev && (
              <script
                async
                defer
                data-do-not-track='true'
                data-website-id='5384fcb9-84be-4d5e-8dba-20d4e862bf19'
                src='https://stats.sthom.kiwi/script.js'
              ></script>
            )}
          </Head>

          <body>
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'document.body.dataset.sthomTheme=localStorage.getItem("sthom-theme")??"default"'
              }}
            />
            <Main />

            <NextScript />
          </body>
        </Html>
      </IconContext.Provider>
    )
  }
}
