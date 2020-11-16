import type { PageProps } from '@post-types/Page'
import s from './index.module.scss'

//x//////////////////////////////////////////////////
// Home
//x//////////////////////////////////////////////////

export default function Home({ node }: PageProps) {
  return (
    <div className={s.home}>
      <h1>title: {node.title}</h1>
      <p>path: {node.uri}</p>
      <p>template: {node.template?.__typename}</p>
      <p>Rendered template: Home</p>
      {node.content && <div dangerouslySetInnerHTML={{ __html: node.content }} />}
    </div>
  )
}
