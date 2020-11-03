import { PageProps } from '@pages/[[...uri]]'

export interface BlogTemplateProps extends Required<PageProps> {}

export function BlogTemplate({ page }: BlogTemplateProps) {
  return (
    <>
      <h1>title: {page.title}</h1>
      <p>path: {page.uri}</p>
      <p>template: {page.template.templateName}</p>
      <p>Rendered template: BlogTemplate</p>
    </>
  )
}
