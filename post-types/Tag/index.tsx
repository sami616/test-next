import type { NodeProps } from '@pages/[[...uri]]'
import s from './index.module.scss'

//x//////////////////////////////////////////////////
// Tag
//x//////////////////////////////////////////////////

export interface TagProps extends NodeProps {
  node: NodeProps['node'] & { __typename: 'Tag' }
}

export default function Tag({ node }: TagProps) {
  return (
    <div className={s.tag}>
      <h1>title: {node.name}</h1>
      <p>path: {node.uri}</p>
      <p>Rendered template: Tag</p>
    </div>
  )
}
