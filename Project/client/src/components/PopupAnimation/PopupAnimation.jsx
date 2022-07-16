import React from 'react'
import './popupAnimation.scss'
export const PopupAnimation = ({data}) => {
  return (
    <div className="popup-container">
        <div className="popup-header">
            {data.header}
        </div>
        <div className="popup-content">
            {data.body}
        </div>
    </div>
  )
}
