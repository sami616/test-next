import type { GetStaticPaths, GetStaticProps } from 'next'
import { Head, Header, Footer } from '@components'
import { PostTypes } from '@post-types'
import { fetchAPI, setURI } from '@utils'
import type { GetDataQuery, GetDataQueryVariables, GetPathsQuery } from '@api-types'

//x//////////////////////////////////////////////////
// Node
//x//////////////////////////////////////////////////

export type RootNode = NonNullable<GetDataQuery['node']>

export type Typenames = Extract<RootNode['__typename'], 'Post' | 'Page' | 'Category' | 'Tag'>

export interface NodeProps extends GetDataQuery {
  node: RootNode & { __typename: Typenames }
}

export default function Node({ node, ...props }: NodeProps) {
  return (
    <>
      <Head node={node} {...props} />
      <Header node={node} {...props} />
      <PostTypes node={node} {...props} />
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<
  GetDataQuery,
  GetDataQueryVariables
> = async context => {
  const uri = setURI(context.params?.uri)

  try {
    const data = await fetchAPI<GetDataQuery, GetDataQueryVariables>(
      /* GraphQL */ `
        query GetData($uri: String!) {
          node: nodeByUri(uri: $uri) {
            __typename
            id
            uri
            ... on Post {
              title
              excerpt
              content
            }
            ... on Page {
              title
              content
              template {
                __typename
              }
            }
            ... on Tag {
              name
              posts {
                edges {
                  node {
                    title
                    uri
                  }
                }
              }
            }
            ... on Category {
              name
              posts {
                edges {
                  node {
                    title
                    uri
                  }
                }
              }
            }
          }

          menu(idType: NAME, id: "FL1 Digital") {
            menuItems {
              edges {
                node {
                  id
                  label
                  path
                }
              }
            }
          }

          posts(first: 10) {
            edges {
              node {
                title
                uri
              }
            }
          }
        }
      `,
      { variables: { uri } }
    )

    const typenames: Typenames[] = ['Post', 'Page', 'Category', 'Tag']

    return {
      props: data,
      revalidate: 20,
      notFound:
        // @ts-ignore
        !data.node || !typenames.includes(data.node.__typename) ? true : false,
    }
  } catch {
    return {
      props: {},
      revalidate: 20,
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { contentNodes } = await fetchAPI<GetPathsQuery>(/* GraphQL */ `
    query GetPaths {
      contentNodes(first: 500) {
        nodes {
          uri
        }
      }
    }
  `)

  return {
    paths:
      contentNodes?.nodes?.map(d => ({
        params: { uri: d?.uri.split('/').filter(slug => !!slug) },
      })) ?? [],
    fallback: true,
  }
}
