import React, { FC } from 'react'

import css from './FavoriteCheckBox.module.scss'

type Props = {
  checked: boolean
  onChange: () => void
}
const FavoriteCheckbox: FC<Props> = ({ checked, onChange }) => {
  const handleKeydown = (event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      onChange()
    }
  }

  return (
    <div
      className={css.checkbox}
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      tabIndex={0}
      onKeyDown={handleKeydown}
    >
      <svg
        height="16px"
        width="16px"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 53.867 53.867"
        xmlSpace="preserve"
        fill={checked ? '#ead239' : '#adacac'}
      >
        <g>
          <polygon points="26.934,1.318 35.256,18.182 53.867,20.887 40.4,34.013 43.579,52.549 26.934,43.798 10.288,52.549 13.467,34.013 0,20.887 18.611,18.182 " />{' '}
        </g>
      </svg>
    </div>
  )
}

export default FavoriteCheckbox
