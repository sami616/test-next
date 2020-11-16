import type { PageProps } from '@post-types/Page'
import s from './index.module.scss'

//x//////////////////////////////////////////////////
// Default
//x//////////////////////////////////////////////////

export default function Default({ node }: PageProps) {
  return (
    <div className={s.default}>
      <h1>title: {node.title}</h1>
      <p>path: {node.uri}</p>
      {node.content && <div dangerouslySetInnerHTML={{ __html: node.content }} />}
      <p>Rendered template: Default</p>
    </div>
  )
}
