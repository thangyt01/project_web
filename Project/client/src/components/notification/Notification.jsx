import React from 'react'
import './notification.scss'
export const Notification = ({data, check}) => {
  return (
    <div className='screen'>
        <div className="container">
            <div className="header">
                {data.header}
            </div>
            <div className="body">
                {data.body}
            </div>
            <div className="btn">
              <button onClick={()=>check(true)}>OK</button>
              <button onClick={()=>check(false)}>HỦY</button>
            </div>
        </div>
    </div>
  )
}
