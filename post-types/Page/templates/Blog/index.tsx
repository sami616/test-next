import Link from 'next/link'
import type { PageProps } from '@post-types/Page'
import s from './index.module.scss'

//x//////////////////////////////////////////////////
// Blog
//x//////////////////////////////////////////////////

export default function Blog({ node, posts }: PageProps) {
  const postList = posts?.edges
  return (
    <div className={s.blog}>
      <h1>title: {node.title}</h1>
      <p>path: {node.uri}</p>
      <p>template: {node.template?.__typename}</p>
      <p>Rendered template: Blog</p>
      {node.content && <div dangerouslySetInnerHTML={{ __html: node.content }} />}
      {postList && (
        <ul>
          {postList.map(post => {
            if (!post?.node) return null
            return (
              <li key={post.node.uri}>
                <Link href={post.node.uri}>
                  <a>{post?.node?.title}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
