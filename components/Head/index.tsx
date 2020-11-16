import NextHead from 'next/head'
import type { NodeProps } from '@pages/[[...uri]]'

function extractTitle(node: NodeProps['node']) {
  const { NEXT_PUBLIC_SITE_NAME } = process.env
  switch (node?.__typename) {
    case 'Page':
      return `${node.title} | ${NEXT_PUBLIC_SITE_NAME}`
    case 'Post':
      return `${node.title} | ${NEXT_PUBLIC_SITE_NAME}`
    case 'Category':
      return `${node.name} | ${NEXT_PUBLIC_SITE_NAME}`
    case 'Tag':
      return `${node.name} | ${NEXT_PUBLIC_SITE_NAME}`
    default:
      return NEXT_PUBLIC_SITE_NAME
  }
}

export function Head({ node }: NodeProps) {
  return (
    <NextHead>
      <title>{extractTitle(node)}</title>
      <link rel='icon' href='/favicon.ico' />
    </NextHead>
  )
}
