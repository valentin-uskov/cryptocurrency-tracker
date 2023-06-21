import React, { FC } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import cn from 'classnames'

import css from './Layout.module.scss'
import BalanceChecker from '../../components/BalanceChecker'

const Layout: FC = () => (
  <div className={css.layout}>
    <header className={css.header}>
      <NavLink className={({ isActive }) => (isActive ? cn(css.link, css.linkActive) : css.link)} to="/">
        Currencies
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? cn(css.link, css.linkActive) : css.link)} to="/favorites">
        Favorites
      </NavLink>
    </header>
    <div />
    <main className={css.main}>
      <Outlet />
    </main>
    <aside className={css.sidebar}>
      <BalanceChecker />
    </aside>
  </div>
)
export default Layout
