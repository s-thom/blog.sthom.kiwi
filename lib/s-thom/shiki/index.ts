import parse from 'fenceparser'
import { isDev } from 'lib/config'
import { CodeBlock } from 'notion-types'
import {
  createShikiHighlighter,
  renderCodeToHTML,
  runTwoSlash
} from 'shiki-twoslash'

import { doesLanguageSupportTwoSlash, languageMap } from './languageMap'
import { syntaxTheme } from './theme'

// TODO: Get the type properly
type Highlighter = any

const highlighterPromise = createShikiHighlighter({
  theme: syntaxTheme as any
})

function doShikiTwoSlash(
  highlighter: Highlighter,
  code: string,
  language: string,
  meta: Record<string, any>
): string {
  let html: string

  if (doesLanguageSupportTwoSlash(language)) {
    const twoslash = runTwoSlash(code, language, {})

    html = renderCodeToHTML(
      twoslash ? twoslash.code : code,
      language,
      meta,
      { themeName: syntaxTheme.name },
      highlighter as any,
      twoslash
    )
  } else {
    html = renderCodeToHTML(
      code,
      language,
      meta,
      { themeName: syntaxTheme.name },
      highlighter as any,
      undefined
    )
  }

  return html
}

export async function highlightCode(
  block: CodeBlock
): Promise<string | undefined> {
  const blockLanguage = block.properties?.language?.[0]?.[0]
  const blockContent = block.properties?.title?.[0]?.[0]

  if (blockLanguage && blockContent) {
    let notionLanguage = blockLanguage.toLowerCase()
    let metaString = ''
    let code = blockContent
    // Try match language from first line of text
    // Match get a "comment", followed by the keyword "lang"
    const match = blockContent.match(
      /^(?:[/#]+ *lang:? *([^\n\s]*)(?: *([^\r\n]*)))(?:\r?\n)?([\s\S]*)$/
    )
    if (match) {
      ;[, notionLanguage, metaString, code] = match
    }

    const language = languageMap[notionLanguage] ?? notionLanguage ?? 'tsx'
    const highlighter = await highlighterPromise
    const meta = metaString ? parse(metaString) : {}

    // Extra: marker for component override
    if (language === 'override') {
      ;(block as any).OVERRIDE_COMPONENT = meta.component
    }

    try {
      const html = doShikiTwoSlash(highlighter, code, language, meta)

      return html
    } catch (err: unknown) {
      console.error(err)
      if (isDev && err instanceof Error) {
        return `<pre>${err.stack}</pre>`
      }

      const plaintext = doShikiTwoSlash(highlighter, code, '', meta)
      return `${plaintext}<!-- Error while highlighting, displaying as plain text -->`
    }
  }

  // eslint-disable-next-line no-console
  console.warn(
    `Unable to determine language and/or content of code block ${block.id}`
  )
  return undefined
}
