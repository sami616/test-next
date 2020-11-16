import s from './index.module.scss'

export interface FullPageLoaderProps {}

export function Loader({}: FullPageLoaderProps) {
  return <div className={s.loader}>Loading</div>
}
