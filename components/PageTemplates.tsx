import dynamic from 'next/dynamic'
import { PageProps } from '@pages/[[...uri]]'
import type { HomeTemplateProps, BlogTemplateProps } from '@components'
import { DefaultTemplateProps } from './DefaultTemplate'

const HomeTemplate = dynamic<HomeTemplateProps>(
  () =>
    import('@components/HomeTemplate').then(({ HomeTemplate }) => HomeTemplate),
  { loading: () => <p>...</p> }
)

const BlogTemplate = dynamic<BlogTemplateProps>(
  () =>
    import('@components/BlogTemplate').then(({ BlogTemplate }) => BlogTemplate),
  { loading: () => <p>...</p> }
)

const DefaultTemplate = dynamic<DefaultTemplateProps>(
  () =>
    import('@components/DefaultTemplate').then(
      ({ DefaultTemplate }) => DefaultTemplate
    ),
  { loading: () => <p>...</p> }
)

export interface PageTemplatesProps extends Required<PageProps> {}

export function PageTemplates({ page }: PageTemplatesProps) {
  if (page.template.templateName === 'Home') {
    return <HomeTemplate page={page} />
  } else if (page.template.templateName === 'Blog') {
    return <BlogTemplate page={page} />
  } else if (page.template.templateName === 'Default') {
    return <DefaultTemplate page={page} />
  } else {
    return null
  }
}
