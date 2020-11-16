import type { NodeProps } from '@pages/[[...uri]]'
import s from './index.module.scss'

//x//////////////////////////////////////////////////
// Category
//x//////////////////////////////////////////////////

export interface CategoryProps extends NodeProps {
  node: NodeProps['node'] & { __typename: 'Category' }
}

export default function Category({ node }: CategoryProps) {
  return (
    <div className={s.category}>
      <h1>title: {node.name}</h1>
      <p>path: {node.uri}</p>
      <p>Rendered template: Category</p>
    </div>
  )
}
