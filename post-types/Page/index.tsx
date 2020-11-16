import dynamic from 'next/dynamic'
import type { NodeProps } from '@pages/[[...uri]]'
import { Loader } from '@components'

//x//////////////////////////////////////////////////
// Page
//x//////////////////////////////////////////////////

const config = { loading: () => <Loader /> }

export const Opts = {
  Home: dynamic<PageProps>(() => import('./templates/Home'), config),
  Blog: dynamic<PageProps>(() => import('./templates/Blog'), config),
  Default: dynamic<PageProps>(() => import('./templates/Default'), config),
}

export interface PageProps extends Pick<NodeProps, 'posts'> {
  node: NodeProps['node'] & { __typename: 'Page' }
}

export default function Page(props: PageProps): JSX.Element {
  /*
  We can safely assert that `template` will not be undefined here as we know that pages fallback to the `default` template in wp.
  Im assuming that template is optional due to it not being required on other post types. wpgraphql should really know and make this property required for pages
  */
  switch (props.node.template!.__typename) {
    case 'HomeTemplate':
      return <Opts.Home {...props} />
    case 'BlogTemplate':
      return <Opts.Blog {...props} />
    default:
      return <Opts.Default {...props} />
  }
}
