import { PageProps } from '@pages/[[...uri]]'

export interface DefaultTemplateProps extends Required<PageProps> {}

export function DefaultTemplate({ page }: DefaultTemplateProps) {
  return (
    <>
      <h1>title: {page.title}</h1>
      <p>path: {page.uri}</p>
      <p>template: {page.template.templateName}</p>
      <p>Rendered template: DefaultTemplate</p>
    </>
  )
}
