import type { NodeProps } from '@pages/[[...uri]].tsx'
import s from './index.module.scss'

//x//////////////////////////////////////////////////
// Post
//x//////////////////////////////////////////////////

export interface PostProps extends NodeProps {
  node: NodeProps['node'] & { __typename: 'Post' }
}

export default function Post({ node }: PostProps) {
  return (
    <div className={s.post}>
      <h1>title: {node.title}</h1>
      <p>path: {node.uri}</p>
      {node.excerpt && <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />}
      {node.content && <div dangerouslySetInnerHTML={{ __html: node.content }} />}
      <div>Rendered template: Post</div>
    </div>
  )
}
