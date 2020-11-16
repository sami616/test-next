import dynamic from 'next/dynamic'
import type { NodeProps } from '@pages/[[...uri]]'
import type { PageProps } from './Page'
import type { PostProps } from './Post'
import type { CategoryProps } from './Category'
import type { TagProps } from './Tag'
import { Loader } from '@components'

//x//////////////////////////////////////////////////
// PostTypes
//x//////////////////////////////////////////////////

const config = { loading: () => <Loader /> }

export const Opts = {
  Page: dynamic<PageProps>(() => import('./Page'), config),
  Post: dynamic<PostProps>(() => import('./Post'), config),
  Tag: dynamic<TagProps>(() => import('./Tag'), config),
  Category: dynamic<CategoryProps>(() => import('./Category'), config),
}

export function PostTypes({ node, ...props }: NodeProps): JSX.Element {
  switch (node.__typename) {
    case 'Page':
      return <Opts.Page node={node} {...props} />
    case 'Post':
      return <Opts.Post node={node} {...props} />
    case 'Category':
      return <Opts.Category node={node} {...props} />
    case 'Tag':
      return <Opts.Tag node={node} {...props} />
  }
}
