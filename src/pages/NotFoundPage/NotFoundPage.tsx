import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import css from './NotFoundPage.module.scss'

const NotFoundPage: FC = () => (
  <div className={css.message}>
    <h3>Page not found</h3>
    <p>
      Contact the administrator or go to the <Link to="/">home page</Link>
    </p>
  </div>
)

export default NotFoundPage
