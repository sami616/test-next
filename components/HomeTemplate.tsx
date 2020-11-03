import { PageProps } from '@pages/[[...uri]]'

export interface HomeTemplateProps extends Required<PageProps> {}

export function HomeTemplate({ page }: HomeTemplateProps) {
  return (
    <>
      <h1>title: {page.title}</h1>
      <p>path: {page.uri}</p>
      <p>template: {page.template.templateName}</p>
      <p>Rendered template: HomeTemplate</p>
    </>
  )
}
