import type { NodeProps } from '@pages/[[...uri]]'
import Link from 'next/link'
import s from './index.module.scss'

export interface HeaderProps extends NodeProps {}

export function Header({ menu }: HeaderProps) {
  const menuItems = menu?.menuItems?.edges
  if (!menuItems) return null
  return (
    <ul className={s.header}>
      {menuItems.map(item => {
        if (!item?.node?.label || !item?.node?.path) return null
        return (
          <li key={item.node.id}>
            <Link href={item?.node?.path}>
              <a>{item?.node?.label}</a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
