import React, { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Currencies from './Currencies'
import Favorites from './Favorites'
import NotFoundPage from './NotFoundPage'

const Router: FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Currencies />} />
      <Route path="favorites" element={<Favorites />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
)

export default Router
