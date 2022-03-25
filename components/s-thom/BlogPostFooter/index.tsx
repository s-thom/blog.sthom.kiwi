import { Block } from 'notion-types'

import { Comments } from './Comments'
import { PostInfo } from './PostInfo'

export interface BlogPostFooterProps {
  block: Block
}

export function BlogPostFooter({ block }: BlogPostFooterProps) {
  return (
    <>
      <PostInfo block={block} />
      <Comments />
    </>
  )
}
